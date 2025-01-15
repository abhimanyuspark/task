export const validation = (data) => {
    const errors = {};
  
    // Check if title is provided
    if (data.hasOwnProperty("title")) {
      if (!data.title.trim()) {
        errors.title = "Title is required";
      }
    }
  
    return errors;
  };