#!/usr/bin/env python3
import argparse, glob, json, os, sys, zipfile
from datetime import datetime
import csv

CSV_DRAW_HEADERS = ["Draw ID","Country","Draw Name","CloseAt","ResultAt","Status","Result2D","Result3D","PayoutRule"]
CSV_PARTICIPANT_HEADERS = ["Participant ID","Name","Contact"]
CSV_ENTRY_HEADERS = ["Entry ID","Participant ID","Draw ID","Rule ID","Pick2D","Pick3D","Stake"]
CSV_PAYMENT_HEADERS = ["Payment ID","Entry ID","Participant ID","Amount","Method","Status","VerifiedAt"]
CSV_RULE_HEADERS = ["Rule ID","Type","MatchType","Multiple","MinStake","MaxStake"]

JSON_TEMPLATES = {
  "template_draw.json": [{
    "Draw ID":"DRAW-YYYY-MM-DD-XX","Country":"TH | VN | ...","Draw Name":"\u0e0a\u0e37\u0e48\u0e23\u0e32\u0e22การ",
    "CloseAt":"YYYY-MM-DD HH:MM","ResultAt":"YYYY-MM-DD HH:MM",
    "Status":"Planned | Open | Closed | Settled","Result2D":"","Result3D":"",
    "PayoutRule":"RULE-2D-STD | RULE-3D-STD"}],
  "template_participant.json":[{"Participant ID":"PART-0001","Name":"\u0e0a\u0e37\u0e48-\u0e2a\u0e01\u0e38\u0e25","Contact":"\u0e40\u0e1a\u0e2d\u0e23/\u0e2d\u0e35\u0e40\u0e21\u0e25"}],
  "template_entry.json":[{"Entry ID":"ENT-0001","Participant ID":"PART-0001","Draw ID":"DRAW-YYYY-MM-DD-XX","Rule ID":"RULE-2D-STD | RULE-3D-STD","Pick2D":"27","Pick3D":"914","Stake":100}],
  "template_payment.json":[{"Payment ID":"PAY-0001","Entry ID":"ENT-0001","Participant ID":"PART-0001","Amount":100,"Method":"Bank | Cash | Wallet | Other","Status":"Pending | Verified | Rejected","VerifiedAt":"YYYY-MM-DD HH:MM"}],
  "template_payoutrule.json":[{"Rule ID":"RULE-2D-STD","Type":"2D | 3D","MatchType":"Exact","Multiple":60,"MinStake":10,"MaxStake":10000}]
}

def write_csv(path, headers, rows=None):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=headers)
        w.writeheader()
        if rows:
            for r in rows: w.writerow(r)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--flow-name", required=True)
    ap.add_argument("--outdir", default="dist")
    ap.add_argument("--draws-input", default="")
    ap.add_argument("--draw-date", default="")
    args = ap.parse_args()

    os.makedirs(args.outdir, exist_ok=True)

    # 1) Empty CSV templates
    write_csv(os.path.join(args.outdir, "template_draw.csv"), CSV_DRAW_HEADERS)
    write_csv(os.path.join(args.outdir, "template_participant.csv"), CSV_PARTICIPANT_HEADERS)
    write_csv(os.path.join(args.outdir, "template_entry.csv"), CSV_ENTRY_HEADERS)
    write_csv(os.path.join(args.outdir, "template_payment.csv"), CSV_PAYMENT_HEADERS)
    write_csv(os.path.join(args.outdir, "template_payoutrule.csv"), CSV_RULE_HEADERS)

    # 2) JSON templates
    for fname, obj in JSON_TEMPLATES.items():
        with open(os.path.join(args.outdir, fname), "w", encoding="utf-8") as f:
            json.dump(obj, f, ensure_ascii=False, indent=2)

    # 3) Draws CSV
    # Priority: explicit --draw-date generation from any CSVs found in data/, else skip
    draws_files = sorted(glob.glob(args.draws_input)) if args.draws_input else []
    copied = False
    if draws_files:
        # copy the latest file
        latest = draws_files[-1]
        with open(latest, "r", encoding="utf-8") as src, open(os.path.join(args.outdir, os.path.basename(latest)), "w", encoding="utf-8") as dst:
            dst.write(src.read())
        copied = True

    if args.draw_date and not copied:
        # minimal single row scaffold for the target date
        d = args.draw_date
        write_csv(os.path.join(args.outdir, f"notion_Draws_{d}.csv"), CSV_DRAW_HEADERS, rows=[{
            "Draw ID": f"DRAW-{d}-01","Country":"TH","Draw Name":"\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32ง",
            "CloseAt": f"{d} 12:00","ResultAt": f"{d} 12:30","Status":"Planned",
            "Result2D":"","Result3D":"","PayoutRule":""}])

    # 4) ZIP
    zip_path = os.path.join(args.outdir, f"{args.flow_name}_artifacts.zip".replace('/', '_').replace(' ', '_'))
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for fn in os.listdir(args.outdir):
            if fn.endswith(".zip"): continue
            z.write(os.path.join(args.outdir, fn), arcname=fn)

    print(zip_path)

if __name__ == "__main__":
    main()
