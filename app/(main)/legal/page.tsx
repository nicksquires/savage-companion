import React from "react";

const page = () => {
  return (
    <div className="flex flex-col p-10 w-full items-center">
      <div>
        <h1 className="font-header text-2xl border-b-2 border-base-content">
          Legal & Licensing Notice
        </h1>

        <div className="space-y-2.5 px-4 pt-4 max-w-4xl">
          <p>
            This application references the Savage Worlds roleplaying game
            system and is intended solely as a fan-created utility for players
            and Game Masters.
          </p>
          <p>
            Savage Worlds and all related trademarks, logos, characters,
            settings, and intellectual property are © Pinnacle Entertainment
            Group. This site is not affiliated with, endorsed, sponsored, or
            approved by Pinnacle Entertainment Group.
          </p>

          <p>
            This website does not reproduce or distribute copyrighted rulebook
            text or proprietary game content. It only references the Savage
            Worlds system for the purpose of supporting gameplay organization
            and campaign management.
          </p>

          <p>
            This project is distributed as free fan content under the&nbsp;
            <a
              href="https://peginc.com/licensing/"
              className="border-dotted link text-primary brightness-95"
            >
              Savage Worlds Fan License
            </a>
            .
          </p>

          <p>
            Savage Worlds is available from Pinnacle Entertainment Group
            at:&nbsp;
            <a
              href="https://www.peginc.com"
              className="border-dotted link text-primary brightness-95"
            >
              https://www.peginc.com
            </a>
          </p>

          <p>
            Pinnacle Entertainment Group makes no representation or warranty
            regarding the quality, viability, or suitability of this project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
