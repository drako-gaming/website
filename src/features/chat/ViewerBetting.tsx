import { FunctionComponent, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { viewerBet, loadViewerBet } from "../betting/bettingSlice";

/*
LEARN: 
  * https://getbootstrap.com/docs/5.0/components/offcanvas/
  * 
TEST:
  * normal run and every case auth/noauth open,closed, canceled and Done

FIX:
  * transaction id if statment thing
  * page loads get bet from api
  * flip flop state, store
TO ASK:
  
betting 
amount o user

POST /api/betting/{id}/bet

{
  "amount": "200",
  "optionId": "23"
}

response
{
  "id": -1,
  "objective": "This is a test bet.",
  "options": [
    {
      "description": "She will live",
      "id": -1,
      "total": 0
    },
    {
      "description": "She will die",
      "id": -1,
      "total": 0
    }
  ],
  "status": "Open",
  "winningOption": null,
  "total": 100,
  "alreadyBet": true
}
*/

//TODO: animate
const TheBet: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  //const bet = useSelector((state: RootState) => state.);
  const betting = useSelector((state: RootState) => state.betting);//when do i get this info with the whole auth or no auth
  const [state, setState] = useState({ OptionId: "", amount: ""});
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  //dispatch(loadViewerBet(profile.twitchId, betting.game.id!))
  //dispatch(viewerBet(OptId, intAmount, Id));

  console.log(betting);
  var BetCheck = [];
  var BetButt = [];
  var RadioName;
  /*
  man får till backa en betting.bet med amount och betopt id jag behöver:
  fixa disabled så att det är samma som när det är open.
  checka den som är vald
  först kolla om .bet finns på något vetigt sätt
  */

  //TODO: change the look of radio BUTTS

console.log(betting);

  if (profile.isAuthenticated)
  {
    if (betting.game.status === "Open" && !betting.game.alreadyBet)//i can do this with less code but it works
    {
      BetCheck.push(
      <>
        <ButtonGroup vertical className="mb-2">
          {betting.game.options.map((item, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            checked={checked}
            value={item.description}
            onChange={(e) => {setState({...state, OptionId : item.id!});  setChecked(e.currentTarget.checked);}}
          >
          {item.description}
          </ToggleButton>
          ))}
        </ButtonGroup>
      </>
      );
      BetButt.push(
        <div className="input-group mb-3 align-self-end d-flex p-3">
          <div className="input-group-append">
            <input name="BetAmount" type='number' min="0" max={profile.balance} className="form-control" onChange={e => setState({...state, amount : e.target.value})}></input>
          </div>
          <button className="btn" type="button" style={{backgroundColor: "#00db84"}} onClick={() => DisForm(state.OptionId, state.amount, betting.game.id!, dispatch)}>Bet!</button>
        </div>
      );
    }//twitchId: string, option: string, amount: number, betId: string
    //item.id === betting.bet?.optionsID ? true : false
    else if(betting.game.status === "Closed" || betting.game.alreadyBet)
    {
      BetCheck.push(
        <>
          <ButtonGroup vertical className="mb-2">
            {betting.game.options.map((item, idx) => (
            <ToggleButton
              disabled
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="secondary"
              name="radio"
              checked={checked}
              value={item.description}
            >
            {item.description}
            </ToggleButton>
            ))}
          </ButtonGroup>
        </>
        );
      /*
      for (let index = 0; index < betting.game.options.length; index++) {
        RadioName = "Option-" + index;

        //TODO: fix this statment to right id
        if (profile.lastTransactionId.toString() === betting.game.options[index].id) 
        {
          BetCheck.push(
            <div className="form-check" key={Math.random().toString(36).substr(2, 9)}>
              <input className="form-check-input" type="radio" name="BettOption" id={RadioName} disabled checked/>
              <label className="form-check-label" htmlFor={RadioName}>
                {betting.game.options[index].description}
              </label>
          </div>
          );
        }
        else
        {
          BetCheck.push(
            <div className="form-check" key={Math.random().toString(36).substr(2, 9)}>
              <input className="form-check-input" type="radio" name="BettOption" id={RadioName} disabled/>
              <label className="form-check-label" htmlFor={RadioName}>
                {betting.game.options[index].description}
              </label>
          </div>
          );
        }
      }*/
    }
  }
  else if(betting.game.status !== "Done" && betting.game.status !== "Cancelled")
  {
    for (let index = 0; index < betting.game.options.length; index++) 
    {
      BetCheck.push(<p key={Math.random().toString(36).substr(2, 9)}>{betting.game.options[index].description}</p>);
    }
  }
  else
  {
    return (null);
  }
  //FIXME: fix for more than one bet later.
  return(
    <form>
      <div>
        <h5>{betting.game.objective}</h5>
        <div className="d-flex justify-content-center p-3">
          {BetCheck}
        </div>
      </div>
      {BetButt}
    </form>
  );
}

//Not the best way but sure is a way
function DisForm(OptId:string, Amount:string, Id:string, dispatch:AppDispatch) {
  var intAmount = Number(Amount);

  if (intAmount !== NaN && OptId !== "") {
    dispatch(viewerBet(OptId, intAmount, Id));
  }
}

const ViewerBetting: FunctionComponent = () => {
  const twitchBGColor = {
    backgroundColor: " #18181B"
  };
  return (
      <div id="ViewerBetting" className="d-none flex-row col-lg" style={twitchBGColor}>
        <div className="border-bottom border-secondary p-4"></div>
        <div className="d-flex justify-content-center">
          <TheBet/>
        </div>
        <div className="d-flex border-bottom border-secondary"></div>
      </div>
  );
};
ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;
