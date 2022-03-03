import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GET_NIGERIA_STATES } from "../../constants/Apis";

import { schoolModel } from "../../models/schoolModel";
import Button from "../UI/Button/Button";

interface RegistrationFormProps {
  handleFormSumit: (data: schoolModel) => void;
  loading: boolean;
}

const RegistrationForm: FC<RegistrationFormProps> = (props) => {
  const [states, setStates] = useState<[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const { handleFormSumit, loading } = props;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<schoolModel>();

  const fetchStates = async () => {
    setLoadingStates(true);
    const { data } = await axios.get(GET_NIGERIA_STATES);
    setStates(data);
    setLoadingStates(false);
  };

  useEffect(() => {
    fetchStates();
  }, []);

  if (loadingStates) {
    return <h1>LOADING...</h1>;
  }

  return (
    <form
      className="w-full max-w-lg"
      onSubmit={handleSubmit((data) => {
        handleFormSumit(data);
        reset();
      })}
    >
      <div className="flex flex-wrap justify-between mb-6">
        <div className="w-[65%]">
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="school_name"
            >
              School Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="school_name"
              type="text"
              placeholder="School Name"
              {...register("schoolName", {
                required: "School name is required",
              })}
            />
            {errors.schoolName && (
              <p className="text-red-500 text-xs italic">
                {errors.schoolName.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-[30%]">
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="game_master"
            >
              Year Founded
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="year_founded"
              type="number"
              placeholder="Year Founded"
              {...register("yearFounded", {
                required: "Which year was your school founded?",
                valueAsNumber: true,
              })}
            />
            {errors.yearFounded && (
              <p className="text-red-500 text-xs italic">
                {errors.yearFounded.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mb-6">
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="year_founded"
          >
            Game Master
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="game_master"
            type="text"
            placeholder="Game Master"
            {...register("gameMaster", { required: "Game master name" })}
          />
          {errors.gameMaster && (
            <p className="text-red-500 text-xs italic">
              {errors.gameMaster.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-between mb-6">
        <div className="w-[48%]">
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="game_master_email"
            >
              Game Master Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="game_master_email"
              type="email"
              placeholder="Game Master Email"
              {...register("gameMasterEmail", {
                required: "Game master email",
              })}
            />
            {errors.gameMasterEmail && (
              <p className="text-red-500 text-xs italic">
                {errors.gameMasterEmail.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="game_master_phone_number"
            >
              Game Master Phone Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="game_master_email"
              type="string"
              placeholder="Game Master Phone Number"
              {...register("gameMasterPhoneNumber", {
                required: "Game master phone number",
              })}
            />
            {errors.gameMasterPhoneNumber && (
              <p className="text-red-500 text-xs italic">
                {errors.gameMasterPhoneNumber.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            State
          </label>
          <div className="relative">
            <select
              {...register("state", { required: "Select a state" })}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select</option>
              {states.map((state: any, idx) => (
                <option value={state} key={idx}>
                  {state}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            {errors.state && (
              <p className="text-red-500 text-xs italic">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-green-600">Loading...</p>
      ) : (
        <Button type="success"> Submit </Button>
      )}
    </form>
  );
};

export default RegistrationForm;
