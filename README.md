# Testing E2E with Playwright

This project contains **end-to-end tests** for the **OrangeHRM Demo Application**, using **Playwright**.

---

## 🛠 Technologies Used

- JavaScript / Node.js  
- Playwright  

---

## 🚀 Installation & Execution

1. Clone the repository:
   ```bash
   git clone https://github.com/DR-Marques/Testing_E2E_Playwright.git
   cd Testing_E2E_Playwright
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npx playwright test
   ```

4. View report:
   ```bash
   npx playwright show-report
   ```

---

## ✅ Test Cases Covered

- Login with valid and invalid credentials  
- Navigate through the dashboard  
- Create and edit employees  
- Logout process  
- Error validation  

---

## 📊 Reports

Playwright generates HTML reports by default.  
You can open them with:
```bash
npx playwright show-report
```

---

## 🧩 Roadmap

- Add more functional and negative test cases  
- Run tests in parallel across multiple browsers  
- Set up CI/CD pipeline (GitHub Actions, Jenkins, etc.)  
- Capture screenshots automatically on failures  

---

## 🎯 Contact

Created and maintained by [Diogo Marques](https://github.com/DR-Marques).  
Issues and contributions are always welcome.  
