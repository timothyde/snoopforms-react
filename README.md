# snoopForms React Library

React Library with form- & survey-elements for the snoopForms platform

[![npm package](https://img.shields.io/badge/npm%20i-@snoopforms/react)](https://www.npmjs.com/package/@snoopforms/react) [![version number](https://img.shields.io/npm/v/@snoopforms/react?color=green&label=version)](https://github.com/snoopforms/snoopforms-react/releases) [![Actions Status](https://github.com/snoopForms/snoopforms-react/workflows/Test/badge.svg)](https://github.com/snoopForms/snoopforms-react/actions) [![License](https://img.shields.io/github/license/snoopforms/snoopforms-react)](https://github.com/snoopForms/snoopforms-react/blob/main/LICENSE)

<br/>

> :warning: **Note**: This repository is still in an early stage of development. We love the open source community and want to show what we are working on early. We will update this readme with more information once it is safe to use. Until then, feel free to share your thoughts, contact us, and contribute if you'd like.

## Installation

```
npm install @snoopforms/react
```

## How to use

Use the SnoopForm components to build your form easily. Use the `SnoopForm` wrapper to make the connection to the SnoopForm Data-Platform. Use `SnoopPage` to tell the Form where you need an new page. The SnoopForms library will only show the current page to the user. That way you can build long, more complex forms or a Typeform-like form-view, where you change the page after every question.
You can choose your `SnoopElements` from a wide range of pre-coded components, including text, email, checkboxes, radio-buttons, color-pickers, and many more.

```jsx
<SnoopForm domain="example.com" formId={"abcde123"}>
  <SnoopPage name="first">
    <SnoopElement type="text" name={"name"} label="Your name" />
    <SnoopElement
      type="radio"
      name="importance"
      label="What's your favorite food?"
      options={["Pizza", "Pasta", "Sushi"]}
    />
    <SnoopSubmit label="Submit 💪">
  </SnoopPage>
</SnoopForm>
```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
