# Thanos

This is a project to implement a table that renders a list of contacts from a json object and an editor that checks bracket matching

## Contacts List

The list of contacts is showing as a table. The fields are **Name**, **Email** and **Agency**

### Features

1. List will show only 50 rows on loading.
2. New rows will append to it as the user scrolls down
3. Total rows loaded will shown on the bottom right corner
4. Search feild is implemented and it will filter the table with `firstname`, `lastname`, `email` and `agency_name`
5. Searching is case insensitive

## Brackets validator

bracket manager is another sub project in Thanos. It will accept all strings/code and will validate the brackets used inside them.

### Features:

1. It shows the error inside the editor itself in the right locaion
2. It shows different error messages on
   * If Opening bracket and Next closing bracket is mismatching
   * If opening bracket is not present
   * If closing bracket is not present
3. Shows random success message at different times

### Logic used:

```
validateBrackets = () => {
    const { codeSnippet } = this.state
    const { bracketErrorMap } = thanosConstants
    let parentheses = "[]{}()",
      stack = [],
      i, character, bracketPosition, errorLocation;

    for(i = 0; character = codeSnippet[i]; i++) {
      bracketPosition = parentheses.indexOf(character);
      if(bracketPosition === -1) {
        // The charactere isn't a bracket
        continue;
      }
      if(bracketPosition % 2 === 0) {
        // The character is a bracket
        errorLocation = i
        stack.push(bracketPosition + 1); // push next expected brace position
      } else {
        let stackPointer = stack[stack.length -1 ]
        if (stack.length > 0 && stackPointer !== bracketPosition) {
          /*
            Opening bracket and closing brackets are different
            Show error at opening bracket position
           */
          stack.pop();
          return {isvalid: false, position: errorLocation, errortext: bracketErrorMap[0]};
        }
        if(stack.length === 0 || stackPointer !== bracketPosition) {
          /*
            Opening bracket is not present
           */
          errorLocation = i
          stack.pop();
          return {isvalid: false, position: errorLocation, errortext: bracketErrorMap[1]};
        }
        stack.pop();
      }
    }
    /*
      Return true if stack is empty
      if isvalid: false; only opening bracket is present at errorLocation
     */
    return {isvalid:(stack.length === 0), position: errorLocation, errortext: bracketErrorMap[2]};
  }
```
