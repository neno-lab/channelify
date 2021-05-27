export const Logo = (props) => {
  return (
    <svg
      onClick={props.onClick}
      className={props.className}
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512.000000 512.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <g
        transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
        fill='#ffffff'
        stroke='none'
      >
        <path
          d='M4665 3825 c-632 -64 -1335 -95 -2125 -95 -705 0 -1209 19 -1845 71
-137 11 -287 23 -332 26 l-83 6 0 -1271 c0 -699 4 -1273 8 -1276 4 -3 78 2
163 9 227 21 571 46 575 42 2 -1 -35 -72 -83 -157 -47 -85 -88 -161 -90 -168
-4 -9 31 -12 155 -12 l160 0 99 177 98 178 45 7 c172 26 1411 37 2000 17 292
-10 327 -13 341 -29 8 -10 57 -93 108 -184 l93 -166 160 0 c124 0 159 3 155
13 -2 6 -43 82 -91 167 l-86 155 28 3 c15 2 144 -6 287 -18 143 -11 299 -24
348 -27 l87 -6 -2 1274 c-3 1266 -3 1274 -23 1275 -11 1 -78 -4 -150 -11z
m-3540 -339 c1033 -63 2075 -57 3130 19 116 8 229 18 253 21 l42 5 0 -968 0
-968 -147 11 c-965 78 -2073 92 -3053 39 -296 -16 -669 -42 -737 -51 l-43 -5
0 968 0 968 148 -11 c81 -7 264 -19 407 -28z'
        />
        <path
          d='M2264 3320 c-154 -40 -295 -139 -379 -266 -125 -188 -138 -439 -33
-644 76 -149 211 -264 371 -316 151 -49 338 -35 476 36 l56 29 170 -170 170
-169 103 103 102 102 -169 169 -170 169 29 57 c46 91 64 172 63 290 0 89 -4
118 -29 190 -16 48 -49 116 -76 157 -149 221 -430 330 -684 263z m260 -280
c89 -28 159 -86 205 -170 31 -56 36 -75 39 -150 5 -118 -19 -183 -102 -266
-83 -83 -148 -107 -266 -102 -75 3 -94 8 -150 39 -165 90 -232 288 -156 454
58 126 187 212 322 214 23 1 72 -8 108 -19z'
        />
      </g>
    </svg>
  );
};

export const SuccessIcon = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='19'
      height='19'
      viewBox='0 0 19 19'
      className={props.className}
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <g>
              <g transform='translate(-153 -821) translate(138 806) translate(15 13) translate(0 2)'>
                <circle cx='9.5' cy='9.5' r='9.5' fill='#FFF' />
                <path
                  stroke='#1abd48'
                  strokeWidth='1.5'
                  d='M5 10.05L7.95 13 14.95 6'
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const FailIcon = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='19'
      height='19'
      viewBox='0 0 19 19'
      className={props.className}
    >
      <g fill='none' fillRule='evenodd'>
        <g>
          <g>
            <g>
              <g transform='translate(-153 -880) translate(138 865) translate(15 13) translate(0 2)'>
                <circle cx='9.5' cy='9.5' r='9.5' fill='#FFF' />
                <g fill='#f32013'>
                  <path
                    d='M5.335 0.243H6.335V11.243H5.335z'
                    transform='rotate(45 3.132 12.046)'
                  />
                  <path
                    d='M5.335 0.243L6.335 0.243 6.335 11.243 5.335 11.243z'
                    transform='rotate(45 3.132 12.046) rotate(-90 5.835 5.743)'
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
