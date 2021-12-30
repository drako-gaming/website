import { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnimatedNumber from "react-animated-number";
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });
  const { dirtyFields, isDirty, isValid } = useFormState({ control });
  const dispatch = useDispatch();
  let fragments: JSX.Element[] = [];
  const enabled = betting.game.status === "Open" && !betting.game.alreadyBet;

  const onSubmit = async (data: Inputs) => {
    dispatch(placeBet(data.optionId, data.amount, betting.game.id!));
  };

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

  if (betting.game.status === "Done") {
    fragments.push(
      <p className="fs-3">
        Result: <span className="text-info">No</span>
      </p>
    );
  }
  if (betting.game.alreadyBet) {
    fragments.push(
      <p>
        You bet <span className="text-info">{betting.bet.amount}</span> scales on{" "}
        <span className="text-info">
          {betting.game.options.find((x) => x.id === betting.bet.optionId)?.description}
        </span>
        . {betting.game.status !== "Done" ? "Good luck!" : `You won ${betting.bet.awarded} scales.`}
      </p>
    );
  } else if (betting.game.status === "Open") {
    fragments.push(<p>Place your bet</p>);
  } else {
    fragments.push(<p>You did not place a bet.</p>);
  }

  if (!enabled && betting.game.status === "Open") {
    fragments.push(
      <>
        <h2>
          <AnimatedNumber className="fs-1" value={betting.game.total} duration={1500} stepPrecision={0} />
        </h2>
        <p>scales wagered</p>
      </>
    );
  } else if (betting.game.status !== "Done") {
    fragments.push(
      <p>
        There are <span className="text-info">{betting.game.total}</span> scales in the pot.
      </p>
    );
  }
  if (betting.game.status === "Closed") {
    fragments.push(
      <table className="table table-borderless">
        <thead>
          <tr>
            <td>Option</td>
            <td>Total wagered</td>
          </tr>
        </thead>
        <tbody>
          {betting.game.options.map((o) => (
            <tr>
              <td>{o.description}</td>
              <td>{o.total} Scales</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (enabled) {
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
          <label
            className={`btn w-100 ${
              dirtyFields.optionId
                ? errors.optionId
                  ? "btn-outline-danger"
                  : "btn-outline-success"
                : "btn-outline-info"
            }`}
            htmlFor={item.id}
          >
            <p>{item.description}</p>
          </label>
        </div>
      </div>
    ));

    fragments.push(
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">Select your bet:</div>
        {options}
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Scales to bet
          </label>
          <input
            className={`form-control ${dirtyFields.amount ? (errors.amount ? "is-invalid" : "is-valid") : ""}`}
            {...register("amount", {
              required: "You must enter an amount to bet",
              min: { value: 1, message: "You must bet at least 1 scale" },
              max: { value: profile.balance, message: `You only have ${profile.balance} scales` },
              disabled: !enabled,
            })}
          />
          {errors.amount && <div className="invalid-feedback">{errors.amount.message}</div>}
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100" disabled={!isDirty || !isValid}>
            Place bet
          </button>
        </div>
      </form>
    );
  }

  if (betting.game.alreadyBet && betting.game.status === "Canceled") {
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
