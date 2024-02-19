### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?

React is a JavaScript library for building user interfaces, particularly for web applications with dynamic content. It allows developers to create reusable UI components and efficiently update the UI when data changes, using a declarative approach. React is commonly used for building single-page applications (SPAs) or large-scale web applications where data needs to be updated frequently. It's popular for its component-based architecture, virtual DOM, and efficient rendering, which make it suitable for building complex UIs.

- What is Babel?

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ (ES6+) code into a backwards-compatible version of JavaScript that can be run in older browsers. It is commonly used with React to transform JSX syntax and modern JavaScript features into code that can be understood by all browsers.

- What is JSX?

JSX (JavaScript XML) is a syntax extension for JavaScript that allows developers to write HTML-like code within their JavaScript code. It is used in React to describe what the UI should look like and allows developers to write code that is more readable and closely resembles HTML.

- How is a Component created in React?

A component in React is typically created by defining a JavaScript function or class that returns JSX code representing the UI for that component. For example, a functional component might look like this:

function MyComponent() {
  return <div>Hello, World!</div>;
}

- What are some difference between state and props?

Props (short for properties) are used to pass data from parent components to child components, while state is used to manage data that can change over time within a component. Props are immutable (read-only) from the child component's perspective, whereas state can be updated using the setState method.

- What does "downward data flow" refer to in React?

Downward data flow in React refers to the practice of passing data from parent components to child components through props. This ensures that the data flow is predictable and helps maintain the single source of truth for the application's state.

- What is a controlled component?

A controlled component is a component in React whose form elements (like <input> or <textarea>) are controlled by React state. This means that the component's state is used to control the value of the form elements, and any changes to the form elements are handled by updating the state.

- What is an uncontrolled component?

An uncontrolled component is a component in React where the form elements do not have their values controlled by React state. Instead, the form elements rely on their own internal state or refs to manage their values. Uncontrolled components are typically used in situations where you need more direct control over form elements.

- What is the purpose of the `key` prop when rendering a list of components?

The key prop is used to uniquely identify each component in a list of components. It helps React identify which items have changed, are added, or are removed in a list, and it is important for performance optimizations and avoiding rendering issues.

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?

Using an array index as a key prop can lead to issues when the list is modified, such as when items are added, removed, or rearranged. If the array index is used as the key prop, React may not be able to correctly identify which items have changed, leading to incorrect rendering or performance issues.

- Describe useEffect.  What use cases is it used for in React components?

useEffect is a React Hook that allows you to perform side effects in function components. It is used to perform actions that need to occur after the component has rendered, such as fetching data from an API, subscribing to events, or updating the document title. useEffect also handles cleanup operations when the component is unmounted or when dependencies change.

- What does useRef do?  Does a change to a ref value cause a rerender of a component?

useRef is a React Hook that returns a mutable ref object whose current property can be used to store a mutable value that persists across renders. Changes to the current property of a ref do not cause a rerender of a component, making it useful for storing mutable values or accessing DOM elements.

- When would you use a ref? When wouldn't you use one?

You would use a ref in React when you need to access or manage a DOM element imperatively, or when you need to store a mutable value that should persist across renders. You wouldn't use a ref for managing component state or props, as those should be managed using React's state management features.

- What is a custom hook in React? When would you want to write one?

A custom hook in React is a JavaScript function that starts with use and can call other hooks. It allows you to encapsulate logic that can be reused across multiple components. You would want to write a custom hook when you find yourself repeating the same logic in multiple components or when you need to abstract complex logic into a reusable function.