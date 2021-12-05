import { FunctionComponent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { viewerBet } from "../betting/bettingSlice";
//import slideInLeft from "react-animated-slideInLeft";



/*
LEARN: 
  * https://www.npmjs.com/package/react-animated-components
  * ^ behövs yarn npm ok liksom liksom
TEST:
  * normal run and every case auth/noauth open,closed, canceled and Done

FIX:
  * transaction id if statment thing

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
  const betting = useSelector((state: RootState) => state.betting);//when do i get this info with the whole auth or no auth
  const [state, setState] = useState({ OptionId: "", amount: ""});
  const dispatch = useDispatch();

  var BetCheck = [];
  var BetButt = [];
  var RadioName;

  //TODO: change the look of radio BUTTS
  if (profile.isAuthenticated)
  {
    if (betting.game.status === "Open" && !betting.game.alreadyBet)//i can do this with less code but it works
    {
      for (let index = 0; index < betting.game.options.length; index++) {
        const item = betting.game.options[index];
        RadioName = "Option-" + index;
        BetCheck.push(
          <div className="form-check" key={Math.random().toString(36).substr(2, 9)}>
            <input onChange={() => setState({...state, OptionId : item.id!})} className="form-check-input" type="radio" name="BettOption" value={betting.game.options[index].id} id={RadioName}/>
            <label className="form-check-label" htmlFor={RadioName}>
              {betting.game.options[index].description}
            </label>
        </div>
        );
      }
      BetButt.push(
        <div className="input-group mb-3 align-self-end d-flex p-3" key={Math.random().toString(36).substr(2, 9)}>
          <input name="BetAmount" type='number' min="0" max={profile.balance} className="form-control" onChange={e => setState({...state, amount : e.target.value})}></input>
          <div className="input-group-append">
            <button className="btn" type="button" style={{backgroundColor: "#00db84"}} onClick={() => DisForm(state.OptionId, state.amount, betting.game.id!, dispatch)}>Bet!</button>
          </div>
        </div>
      );
    }//twitchId: string, option: string, amount: number, betId: string
    else if(betting.game.status === "Closed" || betting.game.alreadyBet)
    {
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
      }
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
      <div className="p-3">
        <h5>{betting.game.objective}</h5>
        {BetCheck}
      </div>
      {BetButt}
    </form>
  );
}

//Not the best way but sure is a way
function DisForm(OptId:string, Amount:string, Id:string, dispatch:AppDispatch) {
  var intAmount = Number(Amount);

  if (intAmount !== NaN) {
    dispatch(viewerBet(OptId, intAmount, Id));
  }
}


const ViewerBetting: FunctionComponent = () => {
  const twitchBGColor = {
    backgroundColor: " #18181B",
    maxWidth: 340
  };

  return (
      <div id="ViewerBetting" className="d-none col d-flex flex-column m-0 p-0" style={twitchBGColor}>
        <div className="d-flex p-4 border-bottom border-secondary"></div>
        <div className="d-flex justify-content-center">
          <TheBet/>
        </div>
        <div className="d-flex border-bottom border-secondary"></div>
      </div>
  );
};
ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;
