import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Chip } from "@material-ui/core";

interface IChip {
  value: string;
  id: string;
}

function App() {
  const [chips, setChips] = useState<IChip[]>([] as IChip[]);
  const [inputWidth, setInputWidth] = useState<number>(2);

  const handleInput = ({ target }: any )=> {
    setInputWidth(size => size + 1);
    if(target.value.length === 0) setInputWidth(2);

    if (target.value[target.value.length - 1] === ",") {
      if (target.value.split(",")[0] === "") {
        target.value = "";
        return;
      }
      setChips([...chips, {
        value: target.value.split(",")[0],
        id: new Date().getDate().toString()
      }]);
      target.value = "";
      setInputWidth(2);
    }
  };

  const handleKeyDown = ({ key, target }: any) => {

    if(key === 'Backspace' && target.value.length > 0) {
      setInputWidth(size => size - 1);
      return ;
    }

    if (key === "Backspace") {
      const removeChip = chips.filter((chip, _, chipsArray) => chip.id !== chipsArray[chipsArray.length - 1].id);
      console.table(chips)
      setChips(removeChip);
    }

  };

  return (
    <div style={{ display: "flex", gap: 5, width: '30%', flexWrap: 'wrap'}}>
      {chips.map((chip: IChip, index) => (
        <Chip label={chip.value} key={index} />
      ))}
      <TextField 
      onInput={handleInput} 
      onKeyDown={handleKeyDown} 
      inputProps={{
        style: {
          width: `${inputWidth}ch`
        }
      }}/>
    </div>
  );
}

export default App;