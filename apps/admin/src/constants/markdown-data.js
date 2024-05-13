const TASK_DESCRIPTION = `
### Task: Implement Snackbar Notifications with Redux

**Objective**: Enhance our e-commerce React application with a centralized notification feature using Snackbar. You will create a system that allows displaying notifications with configurable messages, durations, and positions on the screen through Redux actions.

#### Requirements:

1. **Redux Actions**:
   - \`showMessage\`: Triggers the display of a Snackbar notification.
     - Parameters:
       - \`message\`: The text message to display.
       - \`duration\`: How long (in milliseconds) the message should be visible.
       - \`position\`: Where on the screen the message appears (\`top-right\`, \`top-left\`, \`bottom-right\`, \`bottom-left\`).
     - The message should disappear after the specified duration or when a user clicks the cross (close) icon.
   - \`hideMessage\`: Hides the currently displayed Snackbar notification.

2. **Snackbar Component**:
   - Utilize Material-UI to implement the Snackbar component.
   - Include a cross icon within the Snackbar for manual dismissal before the timer runs out.

3. **Integration**:
   - Place 5 buttons on the homepage stacked on top of each other in the center, 4 to show message, one to hide:
     - Button 1: Show message in the top-right corner.
     - Button 2: Show message in the top-left corner.
     - Button 3: Show message in the bottom-right corner.
     - Button 4: Show message in the bottom-left corner.
     - Button 5: Hide the message.

4. **Testing**:
   - Write unit tests for the components using React Testing Library. Ensure tests cover the functionality of showing and hiding messages, including the timing and position aspects.

#### Technologies:
- **React**
- **Redux and Redux Toolkit**
- **TypeScript**
- **Material-UI**
- **React Testing Library**
`;

export default TASK_DESCRIPTION;
