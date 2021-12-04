import { FunctionComponent, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";

/*
LEARN: 
  * how to fix Bet array

TEST:
  * normal run and every case auth/noauth open,closed, canceled and Done


axtio dispatch


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
OnRadioChange: function(e)
  {
    this.setState({
      Option: e.currentTarget.value
    });
  }
//cancle, open, closed, done
const TheBet: FunctionComponent = () => {

  const profile = useSelector((state: RootState) => state.profile);
  const betting = useSelector((state: RootState) => state.betting);//when do i get this info with the whole auth or no auth
  const dispatch = useDispatch();
  var BetCheck = [];
  var BetButt = [];
  var RadioName;

  //TODO: change the look of BUTTS
  if (profile.isAuthenticated)
  {
    if (betting.game.status === "Open" && !betting.game.alreadyBet)//i can do this with less code but it works
    {
      for (let index = 0; index < betting.game.options.length; index++) {
        RadioName = "Option-" + index;
        BetCheck.push(
          <div className="form-check">
            <input className="form-check-input" type="radio" name="BettOption" value={betting.game.options[index].id} id={RadioName}/>
            <label onChange={this.sele} className="form-check-label" htmlFor={RadioName}>
              {betting.game.options[index].description}
            </label>
        </div>
        );
      }
      BetButt.push(
        <div className="input-group mb-3 align-self-end d-flex p-3">
          <input type='number' min="0" max={profile.balance} className="form-control"></input>
          <div className="input-group-append">
            <button onClick={() => dispatch(ViewerBetting(profile.displayName, betting.game.options[index].id, ))} className="btn" type="button" style={{backgroundColor: "#00db84"}}>Bet!</button>
          </div>
        </div>
      );
    }//twitchId: string, option: string, amount: number, betId: string FIXME: argument for viewer betting
    else if(betting.game.status === "Closed" || betting.game.alreadyBet)
    {
      for (let index = 0; index < betting.game.options.length; index++) {
        RadioName = "Option-" + index;

        //TODO: fix this statment to right id
        if (profile.lastTransactionId.toString() === betting.game.options[index].id) 
        {
          BetCheck.push(
            <div className="form-check">
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
            <div className="form-check">
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
      BetCheck.push(<p>{betting.game.options[index].description}</p>);
    }
  }
  else
  {
    return (null);
  }
  return(
    <div>
      <div className="p-3">
        <h5>{betting.game.objective}</h5>
        {BetCheck}
      </div>
      {BetButt}
    </div>
  );
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
