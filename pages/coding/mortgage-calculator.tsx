import type { NextPage } from "next";
import { Prism } from "@mantine/prism";

const htmlCode = `<form id="mortgage-calculator-form">
  <p>
    <label for="loan-amount">Principal loan amount</label>
  </p>
  <input id="loan-amount" type="text" />
  <p>
    <label for="interest-rate">Interest rate</label>
  </p>
  <p>
    <input id="interest-rate" type="text" /> %
  </p>
  <p>
    <label for="loan-length-years">Length of loan</label>
  </p>
  <p>
    <input id="loan-length-years" type="text" /> Years
  </p>
  <button type="submit">Calculate</button>
</form>
<p id="monthly-mortgage-description"></p>`;

const jsCode = `/*
  Set up an on submit event listener to compute the monthly mortgage payment and update some copy

  Math equation for calculating mortgage payment
  P*r*((1+r)^n)/((1+r)^n)-1))
  P is the principal loan amount
  r is the monthly interest rate
  n is total number of payments on mortgage
*/
document.getElementById("mortgage-calculator-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const loanAmount = parseInt(document.getElementById("loan-amount").value, 10) || 0;
  console.log("Loan Amount", loanAmount);
  const interestRate = (parseInt(document.getElementById("interest-rate").value, 10) || 0) / 12 / 100;
  console.log("Interest rate", interestRate);
  const loanLength = (parseInt(document.getElementById("loan-length-years").value, 10) || 0) * 12;
  console.log("Loan Length: ", loanLength);

  // P*r*((1+r)^n)/((1+r)^n)-1))
  const monthlyMortgagePayment = Math.round(loanAmount * interestRate * (Math.pow(1 + interestRate, loanLength)) / (Math.pow(1 + interestRate, loanLength) - 1));

  const monthlyMortgagePaymentDescription = document.getElementById("monthly-mortgage-description");
  monthlyMortgagePaymentDescription.textContent = \`Your monthly mortgage payment will be $$\{monthlyMortgagePayment.toLocaleString("en-US")}\`;
});`;

const MortgageCalculator: NextPage = () => {
  return (
    <div>
      <p>Source: https://frontendeval.com/questions/mortgage-calculator</p>
      <p>
        Code Pen Example: https://codepen.io/alfinity/pen/NWXBzqo?editors=1111
      </p>
      <Prism.Tabs>
        <Prism.Tab label="mortgageCalculator.js" language="javascript">
          {jsCode}
        </Prism.Tab>
        <Prism.Tab label="index.html" language="markdown">
          {htmlCode}
        </Prism.Tab>
      </Prism.Tabs>
    </div>
  );
};

export default MortgageCalculator;
