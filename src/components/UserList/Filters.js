import React from "react";
import CheckBox from "components/CheckBox";
import * as S from "./style";

function Filters({countries,handleCountryFilter}) {
  return (
    <S.Filters>
      <CheckBox
        isChecked={countries.BR}
        onChange={handleCountryFilter}
        value="BR"
        label="Brazil"
      />
      <CheckBox
        isChecked={countries.FR}
        onChange={handleCountryFilter}
        value="FR"
        label="France"
      />
      <CheckBox
        isChecked={countries.AU}
        onChange={handleCountryFilter}
        value="AU"
        label="Australia"
      />
      <CheckBox
        isChecked={countries.CA}
        onChange={handleCountryFilter}
        value="CA"
        label="Canada"
      />
      <CheckBox
        isChecked={countries.DE}
        onChange={handleCountryFilter}
        value="DE"
        label="Germany"
      />
    </S.Filters>
  );
}

export default Filters;
