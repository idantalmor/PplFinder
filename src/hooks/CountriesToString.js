export const CountriesToString = (countries) => {
  // Get Object like : Object { BR: false, AU: false, CA: false, DE: false }
    if (!countries) return; 
    let listCountry = ""; //Initialize the List
    for (const [key, value] of Object.entries(countries)) { //Checks whether the value of the state value is true, then adds to the list
      if (value === true) {
        listCountry = listCountry.concat(key, ",");
      }
    }
    //listCountry Example: BR,AU,CA,DE,
    const finalListCountry = listCountry.substring(0, listCountry.length - 1);
    //finalListCountry Example : BR,AU,CA,DE
    return finalListCountry;
  };