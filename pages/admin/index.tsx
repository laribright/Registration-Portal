import { MongoClient } from "mongodb";
import { FC, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import ApprovalCard from "../../components/ApprovalCard/ApprovalCard";
import { schoolModel } from "../../models/schoolModel";
import { fixMatch, getMatches, updateSchool } from "../../services/school";
import Button from "../../components/UI/Button/Button";

const Admin: FC<{ schools: schoolModel[] }> = (props) => {
  const { schools } = props;
  const router = useRouter();
  const [school1, setSchool1] = useState<string>("");
  const [school2, setSchool2] = useState<string>("");
  const [matches, setMatches] = useState([]);

  const onMatchFixed = async (event: FormEvent) => {
    event.preventDefault();
    if (school1 === school2) return toast.error("opps... can't play self :)");
    if (!school1 || !school2) return toast.error("Select both teams");

    let userFromStorge;

    if (typeof window !== undefined) {
      if (localStorage) {
        userFromStorge = localStorage.getItem("user")!;
      }
    }

    await fixMatch({ school1, school2 }, userFromStorge);
    toast.success("match fixed successfully");
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage) {
        const userFromStorage = localStorage.getItem("user");
        !userFromStorage && router.push("/admin/login");
      }
    }
    const getFootballmatch = async () => {
      const matches = await getMatches();
      setMatches(matches);
    };
    getFootballmatch();
  }, []);

  const onSchoolUpdate = async (id: string) => {
    await updateSchool(id);
    toast.success("Accepted!");
    router.push("/");
  };

  const responsiveGridStyle = {
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gridTemplateRows: "auto",
  };

  return (
    <div className="w-full min-h-[90vh]">
      <div className="flex w-full px-4">
        <div className="w-[70%]">
          <h2 className="text-center mt-7 text-3xl">Pending Approvals</h2>
          <p className="text-left mt-2 text-base">
            Pending Approvals will appear here
          </p>
          <div className="mt-5 grid gap-3" style={responsiveGridStyle}>
            {schools
              .filter((school) => school.isApproved === false)
              .map((sch) => (
                <ApprovalCard
                  school={sch}
                  key={sch.id}
                  onSchoolUpdate={onSchoolUpdate}
                />
              ))}
          </div>
        </div>

        <div className="w-[30%]">
          <h2 className="text-center mt-7 text-3xl">Approved Schools</h2>
          <p className="text-center mt-2 text-base">
            Approved schools will appear here
          </p>
          {schools
            .filter((school) => school.isApproved === true)
            .map((sch) => (
              <div key={sch.id} className="py-2 border px-1 shadow-lg">
                NAME: {sch.schoolName}
              </div>
            ))}
        </div>
      </div>

      {/* FIX MATCH CENTER */}

      <h2 className="text-center mt-7 text-3xl">
        Fix match **Approved Schools Only
      </h2>

      <form onSubmit={onMatchFixed}>
        <div className="mt-4 flex items-center">
          <div className="w-full px-3 mb-6 md:mb-0 mx-auto">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              School 1 (HOME TEAM)
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={(e) => setSchool1(e.target.value)}
              >
                <option value="">Select</option>
                {schools
                  .filter((school) => school.isApproved === true)
                  .map((sch: any, idx) => (
                    <option value={sch.schoolName} key={idx}>
                      {sch.schoolName}
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
            </div>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
          </div>

          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              School 2 (AWAY TEAM)
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={(e) => setSchool2(e.target.value)}
              >
                <option value="">Select</option>
                {schools
                  .filter((school) => school.isApproved === true)
                  .map((sch: any, idx) => (
                    <option value={sch.schoolName} key={idx}>
                      {sch.schoolName}
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
            </div>
          </div>
        </div>
        <div className="mt-5 px-5">
          <Button type="danger">FIX</Button>
        </div>
      </form>

      <h2 className="text-center">Fixed mathes</h2>
      {matches.length > 0 &&
        matches.map((match: any) => (
          <div
            key={match._id}
            className="w-full flex justify-around mt-3 py-3 px-2 border hover:bg-slate-500"
          >
            <p>{match.school1}</p> <p>VS</p> <p>{match.school2}</p>
          </div>
        ))}
    </div>
  );
};

export default Admin;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://bright:4XbXrKPOdcD0OSdd@portfolio.unwdz.mongodb.net/school?retryWrites=true&w=majority"
  );

  const schoolCollection = client.db().collection("schools");

  const schools = await schoolCollection.find().toArray();

  client.close();

  return {
    props: {
      schools: schools.map((school) => ({
        schoolName: school.schoolName,
        id: school._id.toString(), // Just because mongoDB gives us an objectID
        state: school.state,
        yearFounded: school.yearFounded,
        gameMaster: school.gameMaster,
        gameMasterEmail: school.gameMasterEmail,
        gameMasterPhoneNumber: school.gameMasterPhoneNumber,
        isApproved: school.isApproved,
      })),
    },
    revalidate: 3600, // Every hour 10, 60
  };
}
