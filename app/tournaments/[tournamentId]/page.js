"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import moment from "moment";

import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TopComp from "@/components/TopComp";
import { tournamentsData } from "@/constants/gameData";
import { ListInfoComp } from "@/components/common/PageComp";

import TableComp from "@/components/common/TableComp";

function TournamentSchedule({ schedule }) {
  // ✅ Memoize formatted data
  const formattedSchedule = useMemo(
    () =>
      schedule?.map((item) => ({
        phase: item.phase,
        date: item.start_date
          ? `${moment(item.start_date).format("Do MMM YYYY")}${
              item.end_date
                ? " - " + moment(item.end_date).format("Do MMM YYYY")
                : ""
            }`
          : "-",
      })) ?? [],
    [schedule]
  );

  // ✅ Memoize columns (static, no deps)
  const columns = useMemo(
    () => [
      { header: "Phase", accessor: "phase" },
      { header: "Date", accessor: "date" },
    ],
    []
  );

  return (
    <TableComp
      title="Tournament Schedule"
      columns={columns}
      data={formattedSchedule}
    />
  );
}

// export function TournamentSchedule({ schedule }) {
//   return (
//     <div>
//       <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[var(--text)]">
//         Tournament Schedule
//       </h3>

//       <div className="w-full rounded-lg bg-[var(--surface)] shadow-md">
//         <div className="overflow-x-auto">
//           <table className="w-full border border-[var(--text)] rounded-lg overflow-hidden">
//             {/* Header */}
//             <thead className=" text-[var(--text)]">
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm md:text-base font-semibold border-b border-[var(--text)] uppercase tracking-wide">
//                   Phase
//                 </th>
//                 <th className="px-4 py-2 text-left text-sm md:text-base font-semibold border-b border-[var(--text)] uppercase tracking-wide">
//                   Date
//                 </th>
//               </tr>
//             </thead>

//             {/* Rows */}
//             <tbody>
//               {schedule?.map((item) => {
//                 const startDate = item?.start_date
//                   ? moment(item.start_date).format("Do MMM YYYY")
//                   : null;
//                 const endDate = item?.end_date
//                   ? moment(item.end_date).format("Do MMM YYYY")
//                   : null;

//                 return (
//                   <tr
//                     key={item.id}
//                     className="transition-colors duration-200  text-[var(--subtitle)]"
//                   >
//                     <td className="px-4 py-2 border-b border-[var(--subtitle)] text-sm md:text-base font-medium">
//                       {item.phase}
//                     </td>
//                     <td className="px-4 py-2 border-b border-[var(--subtitle)] text-sm md:text-base ">
//                       {startDate}
//                       {endDate ? ` - ${endDate}` : ""}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

function InformationComp({ tournamentInfo }) {
  return (
    <div className="flex flex-col  gap-4">
      <h1 className="font-sans text-2xl md:text-3xl  font-semibold m-0 text-[var(--text)]">
        About the tournament
      </h1>
      <p className="text-[var(--subtitle)]">{tournamentInfo?.description}</p>
      <div>
        <h1 className="font-sans text-xl md:text-2xl  font-semibold text-[var(--text)] mb-1">
          Format
        </h1>
        <p className="text-[var(--subtitle)]">{tournamentInfo?.format}</p>
      </div>
      <ListInfoComp list={tournamentInfo?.prizeList} heading="Awards" />,
    </div>
  );
}
function RulesComp({ tournamentInfo }) {
  return (
    <div className="flex flex-col gap-2">
      {tournamentInfo?.rules?.map((rule, index) => {
        return (
          <div
            key={`rule-${index}`}
            className="text-sm md:text-base font-medium text-[var(--subtitle)]"
          >
            <ShieldOutlinedIcon className="mr-2" />
            {rule}
          </div>
        );
      })}
    </div>
  );
}

function ParticipantsComp() {
  return <div>ParticipantsComp</div>;
}
function TwoColumnLayout({ tournamentInfo, primaryImage }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Information", "Rules", "Calendar", "Participants"];
  const tabContent = [
    <InformationComp key="InformationComp" tournamentInfo={tournamentInfo} />,
    <RulesComp key="RulesComp" tournamentInfo={tournamentInfo} />,
    <TournamentSchedule
      key="TournamentSchedule"
      schedule={tournamentInfo?.schedule}
    />,
    <ParticipantsComp key="ParticipantsComp" tournamentInfo={tournamentInfo} />,
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full px-8 mt-10">
      {/* Left Section (70%) */}
      <div className="w-full lg:w-[70%] flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-600 overflow-x-auto">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`pb-2 text-sm md:text-base font-medium whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? "border-b-2 border-[var(--title)] text-[var(--title)]"
                  : "text-gray-400 hover:text-[var(--text)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 rounded-lg  min-h-[200px]">
          {tabContent[activeTab]}
        </div>
      </div>

      {/* Right Section (30%) */}
      <div className="w-[95%] lg:w-[30%] h-full min-h-[300px] bg-[var(--surface)] p-4">
        <h2 className="text-[var(--text)] font-semibold text-lg">
          Right Section
        </h2>
        {/* Add your content here */}
      </div>
    </div>
  );
}

export default function TournamentPage() {
  const { tournamentId } = useParams();
  const [tournamentInfo, setTournamentInfo] = useState(null);

  // Fetch from local data
  useEffect(() => {
    if (tournamentId) {
      const tournament = tournamentsData?.tournaments?.find(
        (t) => t.id == tournamentId
      );
      setTournamentInfo(tournament || null);
    }
  }, [tournamentId]);

  const primaryImage = tournamentInfo?.images?.find(
    (img) => img?.is_primary
  )?.image_path;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopComp
        content={{
          chip: [
            { label: tournamentInfo?.category },
            { label: tournamentInfo?.status },
          ],
          title: tournamentInfo?.title,
          description: tournamentInfo?.description,
          backgroundImage: primaryImage,
          button: [
            { label: "Register my team", redirect: "", type: "primary" },
          ],
        }}
      />
      <TwoColumnLayout tournamentInfo={tournamentInfo} />
    </div>
  );
}
