import { FC } from "react";

import { schoolModel } from "../../models/schoolModel";
import Button from "../UI/Button/Button";

interface ApprovalCardProps {
  school: schoolModel;
  onSchoolUpdate: (id: string) => void;
}

const ApprovalCard: FC<ApprovalCardProps> = ({
  school: {
    id,
    schoolName,
    gameMaster,
    gameMasterEmail,
    gameMasterPhoneNumber,
    yearFounded,
    state,
  },
  onSchoolUpdate,
}) => {
  return (
    <div className="border w-[20rem] mx-auto shadow-sm hover:shadow-lg p-4 flex flex-col justify-between leading-normal">
      <div className="mb-4">
        <p className="text-sm text-gray-600 flex items-center">
          <svg
            className="fill-current text-gray-500 w-3 h-3 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
          </svg>
          Not Approved
        </p>
        <div className="text-gray-900 font-bold text-xl mb-2">Approve??</div>
        <p className="text-gray-700 text-base">SchoolName: {schoolName}</p>
        <p className="text-gray-700 text-base">Year Founded: {yearFounded}</p>
        <p className="text-gray-700 text-base">State: {state}</p>
      </div>
      <p className="mt-1 font-semibold">GAME MASTER</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-teal-900 flex items-center justify-center text-white rounded-full mr-4">
          {gameMaster[0]}
        </div>
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{gameMaster}</p>
          <p className="text-gray-600">
            {gameMasterPhoneNumber} | {gameMasterEmail}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Button
          onClick={() => {
            onSchoolUpdate(id!);
          }}
          type="success"
        >
          {/* ! Just to say there must always be an ID */}
          Approve
        </Button>
      </div>
    </div>
  );
};

export default ApprovalCard;
