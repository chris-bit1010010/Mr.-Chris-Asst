# Contributing to Mr. Chris Assistant 🤝

Thank you for your interest in contributing to Mr. Chris Assistant! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm (comes with Node.js)
- Git
- A GitHub account

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Mr.-Chris-Asst.git
   cd Mr.-Chris-Asst
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run tests to verify setup**
   ```bash
   npm test
   ```

5. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Workflow

### 1. Choose an Issue

- Look for issues labeled `good first issue` for beginners
- Check existing issues or create a new one
- Comment on the issue to let others know you're working on it

### 2. Make Your Changes

- Keep changes focused and atomic
- Follow the coding standards
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Validate CSV files
npm run validate-csv

# Test flow template
npm run flow-template
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "Add: brief description of changes"
```

**Commit Message Guidelines:**
- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for updates to existing features
- `Docs:` for documentation changes
- `Test:` for test-related changes
- `Refactor:` for code refactoring

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📁 Project Structure

```
Mr.-Chris-Asst/
├── src/              # Source code
│   ├── lib/         # Core libraries
│   ├── utils/       # Utility functions
│   └── index.js     # Main exports
├── config/          # Configuration
├── scripts/         # Helper scripts
├── docs/            # Documentation
├── notion_files/    # CSV data files
└── test.js          # Tests
```

### Where to Add Different Types of Code

- **New core features** → `src/lib/`
- **Utility functions** → `src/utils/`
- **Helper scripts** → `scripts/`
- **Configuration** → `config/`
- **Documentation** → `docs/`
- **Tests** → Create or update `test.js`

## 📝 Coding Standards

### JavaScript Style

- Use ES6+ features where appropriate
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use `const` and `let`, avoid `var`

### Example

```javascript
// Good
const validateCSVData = (csvData, dataType) => {
    if (!csvData || !csvData.records) {
        return { isValid: false, errors: ['Invalid CSV data'] };
    }
    // ... validation logic
};

// Avoid
var validate = function(d, t) {
    if (!d || !d.r) return { v: false, e: ['bad'] };
    // ... 
};
```

### Code Organization

1. **Imports** at the top
2. **Class definition** or **function declarations**
3. **Module exports** at the bottom

### Documentation

- Add JSDoc comments for public methods
- Include usage examples in documentation
- Update README when adding new features

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific validation
npm run validate-csv
```

### Writing Tests

Add tests to `test.js` or create new test files:

```javascript
// Example test
console.log('🧪 Testing new feature...');
if (myNewFeature() === expected) {
    console.log('✅ Test PASSED');
} else {
    console.log('❌ Test FAILED');
    process.exit(1);
}
```

### Test Coverage

Ensure your changes are tested:
- New features should have new tests
- Bug fixes should include regression tests
- Update existing tests if behavior changes

## 📚 Documentation

### When to Update Documentation

- Adding new features
- Changing existing behavior
- Adding new scripts or commands
- Updating configuration options

### Documentation Files

- **README.md** - Main project documentation
- **docs/API.md** - API reference
- **docs/QUICK-START.md** - Getting started guide
- **FLOW-TEMPLATE-GUIDE.md** - Flow template details
- **CHANGELOG.md** - Version history

### Documentation Style

- Clear and concise
- Include code examples
- Use proper markdown formatting
- Add Thai translations where helpful

## 🔄 Submitting Changes

### Pull Request Process

1. **Ensure your code works**
   - All tests pass
   - No linting errors
   - Documentation updated

2. **Create detailed PR description**
   - What changes were made
   - Why they were needed
   - How to test them

3. **Link related issues**
   - Use "Fixes #123" to auto-close issues

4. **Wait for review**
   - Be responsive to feedback
   - Make requested changes
   - Be patient and respectful

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tests pass locally
- [ ] New tests added (if applicable)
- [ ] Documentation updated

## Related Issues
Fixes #(issue number)
```

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Try to reproduce the bug
3. Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Run command '...'
2. See error

**Expected behavior**
What should happen

**Environment:**
- OS: [e.g., Windows 10, macOS, Ubuntu]
- Node.js version: [e.g., 20.10.0]
- npm version: [e.g., 10.2.0]

**Additional context**
Any other relevant information
```

## 💡 Feature Requests

### Suggesting Features

1. Check if feature already requested
2. Describe the feature clearly
3. Explain the use case
4. Provide examples if possible

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How could this be implemented?

**Alternatives Considered**
Other approaches you've thought about
```

## 🎓 Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Notion API](https://developers.notion.com/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

## ❓ Questions?

- Open an issue with the `question` label
- Check existing documentation
- Review closed issues for similar questions

## 🙏 Thank You!

Your contributions make this project better for everyone. Whether it's code, documentation, bug reports, or feature suggestions - all contributions are valued and appreciated!

---

**Happy Coding! 🎉**
