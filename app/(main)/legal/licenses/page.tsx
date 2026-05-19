export default function LegalPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16 prose prose-invert">
        <h1 className="font-header text-5xl tracking-tighter text-center mb-12">
          Legal &amp; Licensing
        </h1>

        <div className="space-y-8 text-base-content/90">
          <section>
            <h2 className="font-header text-2xl">Savage Worlds Fan License</h2>
            <p className="mx-4 my-2">
              This application is a fan-created utility for the Savage Worlds
              roleplaying game. It is not affiliated with, endorsed, or
              sponsored by Pinnacle Entertainment Group.
            </p>
            <p className="mx-4 my-2">
              Savage Worlds and all related intellectual property are © Pinnacle
              Entertainment Group.
            </p>
          </section>

          <section>
            <h2 className="font-header text-2xl">Third-Party Assets</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                Icons from{" "}
                <a href="https://game-icons.net" className="link-primary">
                  game-icons.net
                </a>{" "}
                — Licensed under{" "}
                <a
                  href="https://creativecommons.org/licenses/by/4.0/deed.en"
                  className="link-primary"
                >
                  CC BY 3.0
                </a>
              </li>
              <li>
                Textures from{" "}
                <a href="https://texturelabs.org" className="link-primary">
                  texturelabs.org
                </a>{" "}
                — Used under their free commercial license
              </li>
              <li>
                Custom fonts used under their respective free/commercial-use
                licenses from{" "}
                <a href="https://1001fonts.com" className="link-primary">
                  1001fonts.com
                </a>{" "}
                and Google Fonts
              </li>
              <li>
                Logo designed by <strong>Giggles and Pie Graphic Design</strong>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-header text-2xl">Copyright</h2>
            <p className="mx-4 my-2">
              © {new Date().getFullYear()} eSquires Studios • Nicholas Squires
            </p>
            <p className="mx-4 my-2 text-sm">
              All original code, design, and compilation are the property of the
              author.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
