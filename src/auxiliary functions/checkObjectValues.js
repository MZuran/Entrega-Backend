function checkObjectValues(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        
        if (value === undefined || value === null || ((typeof value === 'string' && value.trim() === '') && key != "thumbnail")) {
          return false;
        }
      }
    }
    
    return true;
  }

  export {checkObjectValues}