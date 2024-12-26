import React from "react";

const WinnerCardComponent = ({
  username,
  imageUrl,
  additionalStyles = "",
}: {
  username: string;
  imageUrl: string;
  additionalStyles?: string;
}) => {
  // Random values for demonstration
  const winRate = "99.9%";
  const netWinnings = "+68,35654";
  const roundsWon = "11032/11038";

  return (
    <div
      className={`w-[32rem] h-[22rem] p-6 flex flex-col justify-between bg-gradient-to-br rounded-xl relative ${additionalStyles}`}
      style={{
        background:
          "var(--Blur-bg, linear-gradient(103deg, rgba(255, 255, 255, 0.00) -9.33%, rgba(255, 255, 255, 0.23) 119.91%))",
        backdropFilter: "blur(12.784326553344727px)",
        border: "1px solid #ffffff33",
      }}
    >
      <div className="flex gap-2">
        <div>
          <svg
            className="h-40"
            viewBox="0 0 137 178"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_1642_15512)">
              <path
                d="M50.9609 98.6763L67.4457 108.194L33.9704 166.175L24.3623 144.747L50.9609 98.6763Z"
                fill="#418ED6"
              />
              <path
                d="M50.9609 98.6763L34.4761 89.1588L1.0008 147.14L24.3623 144.747L50.9609 98.6763Z"
                fill="#2B63A6"
              />
              <path
                d="M74.4785 98.6763L57.9937 108.194L91.4691 166.175L101.077 144.747L74.4785 98.6763Z"
                fill="#2B63A6"
              />
              <path
                d="M74.4785 98.6763L90.9633 89.1588L124.439 147.14L101.077 144.747L74.4785 98.6763Z"
                fill="#418ED6"
              />
              <circle
                cx="62.6934"
                cy="58.7539"
                r="57.2539"
                fill="#E3E3E3"
                stroke="#404040"
              />
              <circle cx="62.6922" cy="58.754" r="44.3016" fill="#595959" />
              <mask
                id="mask0_1642_15512"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="20"
                y="19"
                // className="w-12 h-12"
                width="90"
                height="89"
              >
                <circle cx="65.057" cy="63.4833" r="44.4047" fill="#C28B37" />
              </mask>
              <g mask="url(#mask0_1642_15512)">
                <circle
                  cx="62.6918"
                  cy="58.7538"
                  r="44.4047"
                  fill="url(#paint0_linear_1642_15512)"
                />
              </g>
              <path
                d="M62.9315 27.8625L72.5102 47.02L91.6676 49.4147L78.5129 64.1659L82.0889 85.3349L62.9315 75.7561L43.774 85.3349L47.382 64.1659L34.1953 49.4147L53.3528 47.02L62.9315 27.8625Z"
                fill="url(#paint1_linear_1642_15512)"
              />
              <path
                d="M61.1038 59.0132L60.4438 62.0932H62.9838V64.5932H59.9038L59.1838 67.9932H56.5238L57.2438 64.5932H53.6038L52.8838 67.9932H50.2438L50.9638 64.5932H47.9438V62.0932H51.5038L52.1638 59.0132H49.1638V56.5132H52.7038L53.4038 53.1932H56.0438L55.3438 56.5132H58.9838L59.6838 53.1932H62.3438L61.6438 56.5132H64.2038V59.0132H61.1038ZM58.4438 59.0132H54.8038L54.1438 62.0932H57.7838L58.4438 59.0132ZM67.0982 64.8332C68.3782 63.7665 69.3982 62.8798 70.1582 62.1732C70.9182 61.4532 71.5515 60.7065 72.0582 59.9332C72.5649 59.1598 72.8182 58.3998 72.8182 57.6532C72.8182 56.9732 72.6582 56.4398 72.3382 56.0532C72.0182 55.6665 71.5249 55.4732 70.8582 55.4732C70.1915 55.4732 69.6782 55.6998 69.3182 56.1532C68.9582 56.5932 68.7715 57.1998 68.7582 57.9732H66.0382C66.0915 56.3732 66.5649 55.1598 67.4582 54.3332C68.3649 53.5065 69.5115 53.0932 70.8982 53.0932C72.4182 53.0932 73.5849 53.4998 74.3982 54.3132C75.2115 55.1132 75.6182 56.1732 75.6182 57.4932C75.6182 58.5332 75.3382 59.5265 74.7782 60.4732C74.2182 61.4198 73.5782 62.2465 72.8582 62.9532C72.1382 63.6465 71.1982 64.4865 70.0382 65.4732H75.9382V67.7932H66.0582V65.7132L67.0982 64.8332Z"
                fill="#202247"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1642_15512"
                x="0.216502"
                y="0.216502"
                width="135.975"
                height="177.711"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="5.48449" dy="5.48449" />
                <feGaussianBlur stdDeviation="3.13399" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1642_15512"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1642_15512"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_1642_15512"
                x1="62.6918"
                y1="14.3491"
                x2="62.6918"
                y2="103.158"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#9CA1A3" />
                <stop offset="1" stop-color="#9CA1A3" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1642_15512"
                x1="62.9315"
                y1="27.8625"
                x2="62.9315"
                y2="85.3349"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F1F5F5" />
                <stop offset="0.0001" stop-color="white" />
                <stop offset="1" stop-color="#F1F5F5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={imageUrl || "/default-profile-image.jpg"}
            alt="Profile"
            className="w-20 h-20 border-4 border-white rounded-full"
          />
          <div className="flex items-center text-4xl text-white font-poppins ">
            {username}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="text-lg text-white font-poppins">Win Rate</div>
          <div className="text-xl text-white ">{winRate}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg text-white font-poppins">
            Net Winnings (LMNG)
          </div>
          <div>
            <div className="text-xl text-green-500">{netWinnings} </div>
            <div className="flex items-center justify-end text-sm text-lg text-white">
              +235
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg text-white font-poppins ">Rounds Won</div>
          <div className="text-xl text-white ">{roundsWon}</div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCardComponent;
