import { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import { RootState } from "../../app/store";
import { placeBet } from "./bettingSlice";

type Inputs = {
  optionId: string;
  amount: number;
};

const ViewerBetting: FunctionComponent = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const betting = useSelector((state: RootState) => state.betting); //when do i get this info with the whole auth or no auth
  const { register, handleSubmit, control } = useForm<Inputs>({ mode: "all", defaultValues: {} });
  const { isDirty, isValid } = useFormState({ control });
  const dispatch = useDispatch();
  let fragments: JSX.Element[] = [];
  const enabled = betting.game.status === "Open" && !betting.game.alreadyBet;

  const onSubmit = async (data: Inputs) => {
    dispatch(placeBet(data.optionId, data.amount, betting.game.id!));
  };

  const options = betting.game.options.map((item) => (
    <div className="row mb-3" key={item.id!.toString()}>
      <div className="col">
        <input
          type="radio"
          className="btn-check w-100"
          value={item.id}
          id={item.id}
          {...register("optionId", { required: true, disabled: !enabled })}
        />
        <label className="btn btn-outline-info w-100" htmlFor={item.id}>
          <p>{item.description}</p>
        </label>
      </div>
    </div>
  ));

  if (betting.game.status === "Open") {
    fragments.push(
      <h1>
        Betting is <span className="text-green">open</span>
      </h1>
    );
  } else {
    fragments.push(
      <h1>
        Betting is <span className="text-red">{betting.game.status!.toLowerCase()}</span>
      </h1>
    );
  }

  fragments.push(<h4>{betting.game.objective}</h4>);

  if (!enabled) {
    fragments.push(
      <p>
        A total of <span className="text-info">{betting.game.total}</span> scales were bet.
      </p>
    );
    for (let i = 0; i < betting.game.options.length; ++i) {
      fragments.push(
        <p>
          <span className="text-info">{betting.game.options[i].total}</span> scales were bet on{" "}
          <span className="text-info">{betting.game.options[i].description}</span>
        </p>
      );
    }
  }
  if (enabled) {
    fragments.push(
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">Select your bet:</div>
        {options}
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Scales to bet
          </label>
          <input
            className="form-control"
            {...register("amount", { required: true, min: 1, max: profile.balance, disabled: !enabled })}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100" disabled={!isDirty || !isValid}>
            Place bet
          </button>
        </div>
      </form>
    );
  } else if (betting.game.alreadyBet && betting.bet) {
    fragments.push(
      <p>
        You bet <span className="text-info">{betting.bet.amount}</span> scales on{" "}
        <span className="text-info">
          {betting.game.options.find((x) => x.id === betting.bet.optionId)?.description}
        </span>
        .
      </p>
    );
  } else {
    fragments.push(<p>You did not place a bet.</p>);
  }

  if(betting.game.alreadyBet && betting.game.status === "Canceled") {
    fragments.push(<p>Your bet was refunded.</p>);
  }
  if (!enabled) {
    fragments.push(
      <Link to="/" className="btn btn-primary w-100">
        Close
      </Link>
    );
  }

  return <div className="text-center">{fragments}</div>;
};

ViewerBetting.displayName = "ViewerBetting";
export default ViewerBetting;
