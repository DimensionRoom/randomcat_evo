import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    color?: string;
    className?: string;
    disabled?: boolean;
}

export default ({ width = '100%', height = '100%', color = '#fff', className, disabled = false }: Props) => {
    return (
        <svg viewBox="0 0 1000 1000" width={width} height={height} className={className}>
            <path d="M0 0 C5.01712024 4.13229978 9.53722484 8.84595937 14.07202148 13.49414062 C17.64945027 17.15454489 21.29178191 20.55433428 25.29052734 23.75366211 C25.71027832 24.16495361 26.1300293 24.57624512 26.5625 25 C26.5625 25.66 26.5625 26.32 26.5625 27 C27.43974731 27.38720215 27.43974731 27.38720215 28.3347168 27.78222656 C30.74284649 29.09858283 32.29681079 30.5209727 34.20703125 32.484375 C34.88443359 33.17273438 35.56183594 33.86109375 36.25976562 34.5703125 C36.95779297 35.28960937 37.65582031 36.00890625 38.375 36.75 C42.32082047 40.79585535 46.21891514 44.7818509 50.57421875 48.390625 C51.56035156 49.25171875 52.54648438 50.1128125 53.5625 51 C53.5625 51.66 53.5625 52.32 53.5625 53 C54.15256836 53.26337158 54.74263672 53.52674316 55.35058594 53.7980957 C57.65822815 55.05201652 59.12977394 56.35195261 60.953125 58.23046875 C61.89478516 59.18856445 61.89478516 59.18856445 62.85546875 60.16601562 C63.82419922 61.16665039 63.82419922 61.16665039 64.8125 62.1875 C68.58386282 66.0629802 72.34691289 69.87126193 76.453125 73.39453125 C82.11321422 78.26757886 87.26066224 83.65318892 92.49609375 88.97265625 C96.7171141 93.2347238 101.00218391 97.30658559 105.55273438 101.21289062 C110.2059185 105.35056164 114.48798362 109.89008232 118.8515625 114.328125 C122.31862387 117.83092927 125.79054602 121.25763721 129.53125 124.46875 C135.16794631 129.31296029 140.28637138 134.67931072 145.49609375 139.97265625 C149.09186227 143.60339172 152.68396956 147.17057357 156.5625 150.5 C162.19062757 155.33132386 167.29686598 160.68997378 172.49609375 165.97265625 C176.09186227 169.60339172 179.68396956 173.17057357 183.5625 176.5 C189.19062757 181.33132386 194.29686598 186.68997378 199.49609375 191.97265625 C203.7171141 196.2347238 208.00218391 200.30658559 212.55273438 204.21289062 C217.2059185 208.35056164 221.48798362 212.89008232 225.8515625 217.328125 C229.9692144 221.48822692 234.16361013 225.44878166 238.60253906 229.26269531 C242.0379204 232.30780911 245.22525411 235.59799109 248.4375 238.875 C249.74507274 240.2080119 251.05486015 241.53885616 252.3671875 242.8671875 C253.21772705 243.73512939 253.21772705 243.73512939 254.08544922 244.62060547 C255.53360166 246.10372935 255.53360166 246.10372935 257.5625 247 C257.5625 247.66 257.5625 248.32 257.5625 249 C258.2225 249 258.8825 249 259.5625 249 C259.5625 249.66 259.5625 250.32 259.5625 251 C260.1301709 251.24097412 260.6978418 251.48194824 261.28271484 251.73022461 C264.01893596 253.25422183 265.84881807 255.07778292 268.0390625 257.31640625 C268.874375 258.16267578 269.7096875 259.00894531 270.5703125 259.88085938 C271.43398438 260.76580078 272.29765625 261.65074219 273.1875 262.5625 C274.90664185 264.31597382 276.62789013 266.06738575 278.3515625 267.81640625 C279.49165771 268.98345093 279.49165771 268.98345093 280.65478516 270.17407227 C282.43807625 272.06086128 282.43807625 272.06086128 284.5625 273 C284.5625 273.66 284.5625 274.32 284.5625 275 C285.2225 275 285.8825 275 286.5625 275 C286.5625 275.66 286.5625 276.32 286.5625 277 C287.15272949 277.26353271 287.74295898 277.52706543 288.35107422 277.79858398 C290.65410527 279.04976701 292.12611442 280.34804978 293.9453125 282.22265625 C294.55503906 282.84333984 295.16476562 283.46402344 295.79296875 284.10351562 C296.41816406 284.74998047 297.04335938 285.39644531 297.6875 286.0625 C298.93786074 287.3472393 300.19036516 288.62989681 301.4453125 289.91015625 C302.27119873 290.76299194 302.27119873 290.76299194 303.11376953 291.63305664 C304.53664012 293.10729905 304.53664012 293.10729905 306.5625 294 C306.5625 294.66 306.5625 295.32 306.5625 296 C307.2225 296 307.8825 296 308.5625 296 C310.1875 297.375 310.1875 297.375 311.5625 299 C311.5625 299.66 311.5625 300.32 311.5625 301 C312.2225 301 312.8825 301 313.5625 301 C313.5625 301.66 313.5625 302.32 313.5625 303 C314.15579102 303.26731934 314.74908203 303.53463867 315.36035156 303.81005859 C317.59183245 305.01584993 319.0289799 306.2358095 320.796875 308.0390625 C321.37050781 308.61914062 321.94414062 309.19921875 322.53515625 309.796875 C323.12167969 310.40015625 323.70820313 311.0034375 324.3125 311.625 C324.91449219 312.23601562 325.51648438 312.84703125 326.13671875 313.4765625 C327.61655305 314.97988624 329.09014676 316.48934856 330.5625 318 C333.4987794 316.67905271 335.53344733 315.26147451 337.76953125 312.953125 C338.35669922 312.355 338.94386719 311.756875 339.54882812 311.140625 C340.15146484 310.51671875 340.75410156 309.8928125 341.375 309.25 C345.41985323 305.08605077 349.50703233 301.12312261 353.95117188 297.38623047 C356.28410463 295.37920135 358.41593931 293.20384724 360.5625 291 C362.82927246 288.70430203 365.1024295 286.41495629 367.375 284.125 C367.95314453 283.53847656 368.53128906 282.95195313 369.12695312 282.34765625 C372.13200128 279.32600562 375.18414314 276.42489741 378.41796875 273.6484375 C383.21171441 269.50809506 387.6215845 265.01219825 392.0625 260.5 C397.07170469 255.41039074 402.10272781 250.46995399 407.52148438 245.81835938 C411.54746894 242.23157312 415.28171498 238.34147178 419.0625 234.5 C424.08177509 229.40015869 429.12295625 224.44816517 434.55273438 219.78710938 C438.3955919 216.36999116 441.95858687 212.66541335 445.5625 209 C453.98441957 200.43436166 453.98441957 200.43436166 458.53125 196.53125 C463.29416514 192.43797243 467.65964126 187.97353063 472.0625 183.5 C477.08177509 178.40015869 482.12295625 173.44816517 487.55273438 168.78710938 C491.3955919 165.36999116 494.95858687 161.66541335 498.5625 158 C506.98441957 149.43436166 506.98441957 149.43436166 511.53125 145.53125 C516.29416514 141.43797243 520.65964126 136.97353063 525.0625 132.5 C530.07170469 127.41039074 535.10272781 122.46995399 540.52148438 117.81835938 C544.54746894 114.23157312 548.28171498 110.34147178 552.0625 106.5 C557.07170469 101.41039074 562.10272781 96.46995399 567.52148438 91.81835938 C571.54746894 88.23157312 575.28171498 84.34147178 579.0625 80.5 C584.14339677 75.3375479 589.2467113 70.31655021 594.74511719 65.59912109 C597.96530594 62.76566646 600.90269029 59.66650195 603.8671875 56.56835938 C605.06345465 55.34320509 606.30922311 54.16677125 607.5625 53 C608.2225 53 608.8825 53 609.5625 53 C609.76875 52.45601563 609.975 51.91203125 610.1875 51.3515625 C612.09163303 48.09506226 614.76859982 45.8490611 617.5625 43.375 C622.7849161 38.67227443 627.76628907 33.83533577 632.63671875 28.765625 C634.5625 27 634.5625 27 636.5625 27 C636.86994141 26.18595703 636.86994141 26.18595703 637.18359375 25.35546875 C639.10391851 22.07514061 641.81025608 19.80656174 644.625 17.3125 C648.57256069 13.7648291 652.37595314 10.19638418 656 6.3125 C664.17413231 -1.93662435 674.41370945 -7.84204837 685.5625 -11 C686.27277344 -11.22300781 686.98304688 -11.44601562 687.71484375 -11.67578125 C704.11890333 -16.16627801 721.27125974 -12.17184263 735.8515625 -4.24609375 C741.09813608 -1.20094506 745.3828139 2.62740531 749.5625 7 C750.1090625 7.515625 750.655625 8.03125 751.21875 8.5625 C762.30094025 19.88048154 767.11398501 37.47304284 766.98266602 52.84106445 C766.26697134 71.96360301 757.85602036 86.66576442 744.5625 100 C743.83417969 100.77214844 743.10585938 101.54429687 742.35546875 102.33984375 C740.5625 104 740.5625 104 738.5625 104 C738.29840332 104.59458008 738.03430664 105.18916016 737.76220703 105.80175781 C736.51492108 108.0871796 735.28604403 109.43023597 733.3671875 111.171875 C732.73707764 111.75050293 732.10696777 112.32913086 731.45776367 112.92529297 C730.79107666 113.52744629 730.12438965 114.12959961 729.4375 114.75 C728.07568528 115.99615374 726.71499941 117.24354228 725.35546875 118.4921875 C724.7011084 119.09256836 724.04674805 119.69294922 723.37255859 120.31152344 C720.46935764 123.01971575 717.7107998 125.86117593 714.98046875 128.7421875 C713.5625 130 713.5625 130 711.5625 130 C711.5625 130.66 711.5625 131.32 711.5625 132 C708.53513149 135.33010536 705.16820464 138.25495521 701.8125 141.25 C697.60679419 145.00576403 693.61800813 148.91989917 689.66015625 152.93359375 C687.29579816 155.26272863 684.83317022 157.41490618 682.265625 159.515625 C679.91318949 161.56591283 677.75515074 163.77935797 675.5625 166 C673.12770235 168.461024 670.68929777 170.91843723 668.25 173.375 C667.62416016 174.00921875 666.99832031 174.6434375 666.35351562 175.296875 C663.2194458 178.44701698 660.04783284 181.48767616 656.67578125 184.3828125 C651.89100248 188.51097097 647.49304203 192.99834172 643.0625 197.5 C638.05329531 202.58960926 633.02227219 207.53004601 627.60351562 212.18164062 C623.57753106 215.76842688 619.84328502 219.65852822 616.0625 223.5 C611.04322491 228.59984131 606.00204375 233.55183483 600.57226562 238.21289062 C596.7294081 241.63000884 593.16641313 245.33458665 589.5625 249 C581.14058043 257.56563834 581.14058043 257.56563834 576.59375 261.46875 C571.83083486 265.56202757 567.46535874 270.02646937 563.0625 274.5 C558.05329531 279.58960926 553.02227219 284.53004601 547.60351562 289.18164062 C543.57753106 292.76842688 539.84328502 296.65852822 536.0625 300.5 C531.03315368 305.61007419 525.98181383 310.57362492 520.54101562 315.24414062 C516.88146407 318.49185716 513.48952043 322.01055661 510.0625 325.5 C506.02334209 329.61273091 502.00112576 333.68092545 497.625 337.4375 C492.85317609 341.54305154 488.47574057 346.0159209 484.0625 350.5 C479.05329531 355.58960926 474.02227219 360.53004601 468.60351562 365.18164062 C464.57753106 368.76842688 460.84328502 372.65852822 457.0625 376.5 C452.05329531 381.58960926 447.02227219 386.53004601 441.60351562 391.18164062 C437.57753106 394.76842688 433.84328502 398.65852822 430.0625 402.5 C424.98160323 407.6624521 419.8782887 412.68344979 414.37988281 417.40087891 C411.15969406 420.23433354 408.22230971 423.33349805 405.2578125 426.43164062 C404.06154535 427.65679491 402.81577689 428.83322875 401.5625 430 C400.9025 430 400.2425 430 399.5625 430 C399.35625 430.54398438 399.15 431.08796875 398.9375 431.6484375 C397.03343535 434.90482079 394.35668313 437.1513824 391.5625 439.625 C387.39405109 443.36879966 383.40592656 447.16635928 379.5625 451.25 C366.67883304 464.25915723 350.26507751 470.12189064 332.3125 470.3125 C313.17500218 470.18595879 296.92306934 464.3341623 283.30859375 450.80859375 C282.40238281 449.88175781 281.49617188 448.95492188 280.5625 448 C279.66660156 447.10410156 278.77070313 446.20820312 277.84765625 445.28515625 C276.16925821 443.60675821 274.49692714 441.92226119 272.83203125 440.23046875 C270.77264594 438.20652897 268.66060768 436.33996687 266.4375 434.5 C265.48875 433.675 264.54 432.85 263.5625 432 C263.5625 431.34 263.5625 430.68 263.5625 430 C262.97766846 429.74186523 262.39283691 429.48373047 261.7902832 429.21777344 C259.38215351 427.90141717 257.82818921 426.4790273 255.91796875 424.515625 C255.24056641 423.82726562 254.56316406 423.13890625 253.86523438 422.4296875 C253.16720703 421.71039062 252.46917969 420.99109375 251.75 420.25 C247.80417953 416.20414465 243.90608486 412.2181491 239.55078125 408.609375 C238.07158203 407.31773437 238.07158203 407.31773437 236.5625 406 C236.5625 405.34 236.5625 404.68 236.5625 404 C235.97243164 403.73662842 235.38236328 403.47325684 234.77441406 403.2019043 C232.46677185 401.94798348 230.99522606 400.64804739 229.171875 398.76953125 C228.54410156 398.13080078 227.91632813 397.49207031 227.26953125 396.83398438 C226.62371094 396.16689453 225.97789062 395.49980469 225.3125 394.8125 C221.54113718 390.9370198 217.77808711 387.12873807 213.671875 383.60546875 C208.01178578 378.73242114 202.86433776 373.34681108 197.62890625 368.02734375 C194.03313773 364.39660828 190.44103044 360.82942643 186.5625 357.5 C180.93437243 352.66867614 175.82813402 347.31002622 170.62890625 342.02734375 C166.4078859 337.7652762 162.12281609 333.69341441 157.57226562 329.78710938 C152.9190815 325.64943836 148.63701638 321.10991768 144.2734375 316.671875 C140.80637613 313.16907073 137.33445398 309.74236279 133.59375 306.53125 C127.95705369 301.68703971 122.83862862 296.32068928 117.62890625 291.02734375 C114.03313773 287.39660828 110.44103044 283.82942643 106.5625 280.5 C100.93437243 275.66867614 95.82813402 270.31002622 90.62890625 265.02734375 C86.4078859 260.7652762 82.12281609 256.69341441 77.57226562 252.78710938 C72.9190815 248.64943836 68.63701638 244.10991768 64.2734375 239.671875 C60.80637613 236.16907073 57.33445398 232.74236279 53.59375 229.53125 C47.95705369 224.68703971 42.83862862 219.32068928 37.62890625 214.02734375 C33.35136634 209.70820702 29.0098512 205.56803092 24.39794922 201.60839844 C21.59716887 199.15408333 18.98439808 196.52968804 16.375 193.875 C15.88064453 193.37613281 15.38628906 192.87726563 14.87695312 192.36328125 C12.57601455 190.0411219 10.28024171 187.71389274 7.984375 185.38671875 C5.71744766 183.15269842 3.39098686 181.03719912 1 178.9375 C-3.49593918 174.92398649 -7.7707741 170.74007808 -11.97485352 166.42553711 C-14.63974163 163.71259137 -17.37790735 161.15609348 -20.26171875 158.67578125 C-24.77452554 154.7715391 -28.94498546 150.56722436 -33.125 146.3125 C-37.40985619 141.95227255 -41.61544894 137.77056462 -46.4375 134 C-48.12818436 132.35770223 -49.79135499 130.68693869 -51.4375 129 C-54.05816788 126.34986219 -56.68566349 123.70652142 -59.3125 121.0625 C-59.99441406 120.37220703 -60.67632812 119.68191406 -61.37890625 118.97070312 C-65.0745352 115.25747594 -68.83872009 111.73348067 -72.8515625 108.36645508 C-75.17228816 106.36690127 -77.29371967 104.18623143 -79.4375 102 C-80.23929688 101.24460937 -81.04109375 100.48921875 -81.8671875 99.7109375 C-95.74168031 86.45702904 -103.32721663 70.45436339 -103.875 51.1875 C-103.70829682 32.73456893 -96.55826514 16.97840603 -83.4375 4 C-82.66212891 3.17435547 -82.66212891 3.17435547 -81.87109375 2.33203125 C-59.91374317 -19.05202036 -23.53094789 -17.09739285 0 0 Z " fill={disabled?'#FFFFFF26':'#FFFFFF'} transform="translate(168.4375,428)" />
            <path d="M0 0 C5.01712024 4.13229978 9.53722484 8.84595937 14.07202148 13.49414062 C17.64945027 17.15454489 21.29178191 20.55433428 25.29052734 23.75366211 C25.71027832 24.16495361 26.1300293 24.57624512 26.5625 25 C26.5625 25.66 26.5625 26.32 26.5625 27 C27.43974731 27.38720215 27.43974731 27.38720215 28.3347168 27.78222656 C30.74284649 29.09858283 32.29681079 30.5209727 34.20703125 32.484375 C34.88443359 33.17273438 35.56183594 33.86109375 36.25976562 34.5703125 C36.95779297 35.28960937 37.65582031 36.00890625 38.375 36.75 C42.32082047 40.79585535 46.21891514 44.7818509 50.57421875 48.390625 C51.56035156 49.25171875 52.54648438 50.1128125 53.5625 51 C53.5625 51.66 53.5625 52.32 53.5625 53 C54.15256836 53.26337158 54.74263672 53.52674316 55.35058594 53.7980957 C57.65822815 55.05201652 59.12977394 56.35195261 60.953125 58.23046875 C61.89478516 59.18856445 61.89478516 59.18856445 62.85546875 60.16601562 C63.82419922 61.16665039 63.82419922 61.16665039 64.8125 62.1875 C68.58386282 66.0629802 72.34691289 69.87126193 76.453125 73.39453125 C82.11321422 78.26757886 87.26066224 83.65318892 92.49609375 88.97265625 C96.7171141 93.2347238 101.00218391 97.30658559 105.55273438 101.21289062 C110.2059185 105.35056164 114.48798362 109.89008232 118.8515625 114.328125 C122.31862387 117.83092927 125.79054602 121.25763721 129.53125 124.46875 C135.16794631 129.31296029 140.28637138 134.67931072 145.49609375 139.97265625 C149.09186227 143.60339172 152.68396956 147.17057357 156.5625 150.5 C162.19062757 155.33132386 167.29686598 160.68997378 172.49609375 165.97265625 C176.09186227 169.60339172 179.68396956 173.17057357 183.5625 176.5 C189.19062757 181.33132386 194.29686598 186.68997378 199.49609375 191.97265625 C203.7171141 196.2347238 208.00218391 200.30658559 212.55273438 204.21289062 C217.2059185 208.35056164 221.48798362 212.89008232 225.8515625 217.328125 C229.9692144 221.48822692 234.16361013 225.44878166 238.60253906 229.26269531 C242.0379204 232.30780911 245.22525411 235.59799109 248.4375 238.875 C249.74507274 240.2080119 251.05486015 241.53885616 252.3671875 242.8671875 C253.21772705 243.73512939 253.21772705 243.73512939 254.08544922 244.62060547 C255.53360166 246.10372935 255.53360166 246.10372935 257.5625 247 C257.5625 247.66 257.5625 248.32 257.5625 249 C258.2225 249 258.8825 249 259.5625 249 C259.5625 249.66 259.5625 250.32 259.5625 251 C260.1301709 251.24097412 260.6978418 251.48194824 261.28271484 251.73022461 C264.01893596 253.25422183 265.84881807 255.07778292 268.0390625 257.31640625 C268.874375 258.16267578 269.7096875 259.00894531 270.5703125 259.88085938 C271.43398438 260.76580078 272.29765625 261.65074219 273.1875 262.5625 C274.90664185 264.31597382 276.62789013 266.06738575 278.3515625 267.81640625 C279.49165771 268.98345093 279.49165771 268.98345093 280.65478516 270.17407227 C282.43807625 272.06086128 282.43807625 272.06086128 284.5625 273 C284.5625 273.66 284.5625 274.32 284.5625 275 C285.2225 275 285.8825 275 286.5625 275 C286.5625 275.66 286.5625 276.32 286.5625 277 C287.15272949 277.26353271 287.74295898 277.52706543 288.35107422 277.79858398 C290.65410527 279.04976701 292.12611442 280.34804978 293.9453125 282.22265625 C294.55503906 282.84333984 295.16476562 283.46402344 295.79296875 284.10351562 C296.41816406 284.74998047 297.04335938 285.39644531 297.6875 286.0625 C298.93786074 287.3472393 300.19036516 288.62989681 301.4453125 289.91015625 C302.27119873 290.76299194 302.27119873 290.76299194 303.11376953 291.63305664 C304.53664012 293.10729905 304.53664012 293.10729905 306.5625 294 C306.5625 294.66 306.5625 295.32 306.5625 296 C307.2225 296 307.8825 296 308.5625 296 C310.1875 297.375 310.1875 297.375 311.5625 299 C311.5625 299.66 311.5625 300.32 311.5625 301 C312.2225 301 312.8825 301 313.5625 301 C313.5625 301.66 313.5625 302.32 313.5625 303 C314.15579102 303.26731934 314.74908203 303.53463867 315.36035156 303.81005859 C317.59183245 305.01584993 319.0289799 306.2358095 320.796875 308.0390625 C321.37050781 308.61914062 321.94414062 309.19921875 322.53515625 309.796875 C323.12167969 310.40015625 323.70820313 311.0034375 324.3125 311.625 C324.91449219 312.23601562 325.51648438 312.84703125 326.13671875 313.4765625 C327.61655305 314.97988624 329.09014676 316.48934856 330.5625 318 C333.4987794 316.67905271 335.53344733 315.26147451 337.76953125 312.953125 C338.35669922 312.355 338.94386719 311.756875 339.54882812 311.140625 C340.15146484 310.51671875 340.75410156 309.8928125 341.375 309.25 C345.41985323 305.08605077 349.50703233 301.12312261 353.95117188 297.38623047 C356.28410463 295.37920135 358.41593931 293.20384724 360.5625 291 C362.82927246 288.70430203 365.1024295 286.41495629 367.375 284.125 C367.95314453 283.53847656 368.53128906 282.95195312 369.12695312 282.34765625 C372.13200128 279.32600562 375.18414314 276.42489741 378.41796875 273.6484375 C383.21171441 269.50809506 387.6215845 265.01219825 392.0625 260.5 C397.07170469 255.41039074 402.10272781 250.46995399 407.52148438 245.81835938 C411.54746894 242.23157312 415.28171498 238.34147178 419.0625 234.5 C424.08177509 229.40015869 429.12295625 224.44816517 434.55273438 219.78710938 C438.3955919 216.36999116 441.95858687 212.66541335 445.5625 209 C453.98441957 200.43436166 453.98441957 200.43436166 458.53125 196.53125 C463.29416514 192.43797243 467.65964126 187.97353063 472.0625 183.5 C477.08177509 178.40015869 482.12295625 173.44816517 487.55273438 168.78710938 C491.3955919 165.36999116 494.95858687 161.66541335 498.5625 158 C506.98441957 149.43436166 506.98441957 149.43436166 511.53125 145.53125 C516.29416514 141.43797243 520.65964126 136.97353063 525.0625 132.5 C530.07170469 127.41039074 535.10272781 122.46995399 540.52148438 117.81835938 C544.54746894 114.23157312 548.28171498 110.34147178 552.0625 106.5 C557.07170469 101.41039074 562.10272781 96.46995399 567.52148438 91.81835938 C571.54746894 88.23157312 575.28171498 84.34147178 579.0625 80.5 C584.14339677 75.3375479 589.2467113 70.31655021 594.74511719 65.59912109 C597.96530594 62.76566646 600.90269029 59.66650195 603.8671875 56.56835938 C605.06345465 55.34320509 606.30922311 54.16677125 607.5625 53 C608.2225 53 608.8825 53 609.5625 53 C609.76875 52.45601563 609.975 51.91203125 610.1875 51.3515625 C612.09163303 48.09506226 614.76859982 45.8490611 617.5625 43.375 C622.7849161 38.67227443 627.76628907 33.83533577 632.63671875 28.765625 C634.5625 27 634.5625 27 636.5625 27 C636.86994141 26.18595703 636.86994141 26.18595703 637.18359375 25.35546875 C639.10391851 22.07514061 641.81025608 19.80656174 644.625 17.3125 C648.57256069 13.7648291 652.37595314 10.19638418 656 6.3125 C664.17413231 -1.93662435 674.41370945 -7.84204837 685.5625 -11 C686.27277344 -11.22300781 686.98304688 -11.44601563 687.71484375 -11.67578125 C704.11890333 -16.16627801 721.27125974 -12.17184263 735.8515625 -4.24609375 C741.09813608 -1.20094506 745.3828139 2.62740531 749.5625 7 C750.1090625 7.515625 750.655625 8.03125 751.21875 8.5625 C762.30094025 19.88048154 767.11398501 37.47304284 766.98266602 52.84106445 C766.26697134 71.96360301 757.85602036 86.66576442 744.5625 100 C743.83417969 100.77214844 743.10585938 101.54429687 742.35546875 102.33984375 C740.5625 104 740.5625 104 738.5625 104 C738.29840332 104.59458008 738.03430664 105.18916016 737.76220703 105.80175781 C736.51492108 108.0871796 735.28604403 109.43023597 733.3671875 111.171875 C732.73707764 111.75050293 732.10696777 112.32913086 731.45776367 112.92529297 C730.79107666 113.52744629 730.12438965 114.12959961 729.4375 114.75 C728.07568528 115.99615374 726.71499941 117.24354228 725.35546875 118.4921875 C724.7011084 119.09256836 724.04674805 119.69294922 723.37255859 120.31152344 C720.46935764 123.01971575 717.7107998 125.86117593 714.98046875 128.7421875 C713.5625 130 713.5625 130 711.5625 130 C711.5625 130.66 711.5625 131.32 711.5625 132 C708.53513149 135.33010536 705.16820464 138.25495521 701.8125 141.25 C697.60679419 145.00576403 693.61800813 148.91989917 689.66015625 152.93359375 C687.29579816 155.26272863 684.83317022 157.41490618 682.265625 159.515625 C679.91318949 161.56591283 677.75515074 163.77935797 675.5625 166 C673.12770235 168.461024 670.68929777 170.91843723 668.25 173.375 C667.62416016 174.00921875 666.99832031 174.6434375 666.35351562 175.296875 C663.2194458 178.44701698 660.04783284 181.48767616 656.67578125 184.3828125 C651.89100248 188.51097097 647.49304203 192.99834172 643.0625 197.5 C638.05329531 202.58960926 633.02227219 207.53004601 627.60351562 212.18164062 C623.57753106 215.76842688 619.84328502 219.65852822 616.0625 223.5 C611.04322491 228.59984131 606.00204375 233.55183483 600.57226562 238.21289062 C596.7294081 241.63000884 593.16641313 245.33458665 589.5625 249 C581.14058043 257.56563834 581.14058043 257.56563834 576.59375 261.46875 C571.83083486 265.56202757 567.46535874 270.02646937 563.0625 274.5 C558.05329531 279.58960926 553.02227219 284.53004601 547.60351562 289.18164062 C543.57753106 292.76842688 539.84328502 296.65852822 536.0625 300.5 C531.03315368 305.61007419 525.98181383 310.57362492 520.54101562 315.24414062 C516.88146407 318.49185716 513.48952043 322.01055661 510.0625 325.5 C506.02334209 329.61273091 502.00112576 333.68092545 497.625 337.4375 C492.85317609 341.54305154 488.47574057 346.0159209 484.0625 350.5 C479.05329531 355.58960926 474.02227219 360.53004601 468.60351562 365.18164062 C464.57753106 368.76842688 460.84328502 372.65852822 457.0625 376.5 C452.05329531 381.58960926 447.02227219 386.53004601 441.60351562 391.18164062 C437.57753106 394.76842688 433.84328502 398.65852822 430.0625 402.5 C424.98160323 407.6624521 419.8782887 412.68344979 414.37988281 417.40087891 C411.15969406 420.23433354 408.22230971 423.33349805 405.2578125 426.43164062 C404.06154535 427.65679491 402.81577689 428.83322875 401.5625 430 C400.9025 430 400.2425 430 399.5625 430 C399.35625 430.54398438 399.15 431.08796875 398.9375 431.6484375 C397.03343535 434.90482079 394.35668313 437.1513824 391.5625 439.625 C387.39405109 443.36879966 383.40592656 447.16635928 379.5625 451.25 C366.67883304 464.25915723 350.26507751 470.12189064 332.3125 470.3125 C313.17500218 470.18595879 296.92306934 464.3341623 283.30859375 450.80859375 C282.40238281 449.88175781 281.49617188 448.95492188 280.5625 448 C279.66660156 447.10410156 278.77070313 446.20820312 277.84765625 445.28515625 C276.16925821 443.60675821 274.49692714 441.92226119 272.83203125 440.23046875 C270.77264594 438.20652897 268.66060768 436.33996687 266.4375 434.5 C265.48875 433.675 264.54 432.85 263.5625 432 C263.5625 431.34 263.5625 430.68 263.5625 430 C262.97766846 429.74186523 262.39283691 429.48373047 261.7902832 429.21777344 C259.38215351 427.90141717 257.82818921 426.4790273 255.91796875 424.515625 C255.24056641 423.82726562 254.56316406 423.13890625 253.86523438 422.4296875 C253.16720703 421.71039062 252.46917969 420.99109375 251.75 420.25 C247.80417953 416.20414465 243.90608486 412.2181491 239.55078125 408.609375 C238.07158203 407.31773437 238.07158203 407.31773437 236.5625 406 C236.5625 405.34 236.5625 404.68 236.5625 404 C235.97243164 403.73662842 235.38236328 403.47325684 234.77441406 403.2019043 C232.46677185 401.94798348 230.99522606 400.64804739 229.171875 398.76953125 C228.54410156 398.13080078 227.91632813 397.49207031 227.26953125 396.83398438 C226.62371094 396.16689453 225.97789062 395.49980469 225.3125 394.8125 C221.54113718 390.9370198 217.77808711 387.12873807 213.671875 383.60546875 C208.01178578 378.73242114 202.86433776 373.34681108 197.62890625 368.02734375 C194.03313773 364.39660828 190.44103044 360.82942643 186.5625 357.5 C180.93437243 352.66867614 175.82813402 347.31002622 170.62890625 342.02734375 C166.4078859 337.7652762 162.12281609 333.69341441 157.57226562 329.78710938 C152.9190815 325.64943836 148.63701638 321.10991768 144.2734375 316.671875 C140.80637613 313.16907073 137.33445398 309.74236279 133.59375 306.53125 C127.95705369 301.68703971 122.83862862 296.32068928 117.62890625 291.02734375 C114.03313773 287.39660828 110.44103044 283.82942643 106.5625 280.5 C100.93437243 275.66867614 95.82813402 270.31002622 90.62890625 265.02734375 C86.4078859 260.7652762 82.12281609 256.69341441 77.57226562 252.78710938 C72.9190815 248.64943836 68.63701638 244.10991768 64.2734375 239.671875 C60.80637613 236.16907073 57.33445398 232.74236279 53.59375 229.53125 C47.95705369 224.68703971 42.83862862 219.32068928 37.62890625 214.02734375 C33.35136634 209.70820702 29.0098512 205.56803092 24.39794922 201.60839844 C21.59716887 199.15408333 18.98439808 196.52968804 16.375 193.875 C15.88064453 193.37613281 15.38628906 192.87726563 14.87695312 192.36328125 C12.57601455 190.0411219 10.28024171 187.71389274 7.984375 185.38671875 C5.71744766 183.15269842 3.39098686 181.03719912 1 178.9375 C-3.49593918 174.92398649 -7.7707741 170.74007808 -11.97485352 166.42553711 C-14.63974163 163.71259137 -17.37790735 161.15609348 -20.26171875 158.67578125 C-24.77452554 154.7715391 -28.94498546 150.56722436 -33.125 146.3125 C-37.40985619 141.95227255 -41.61544894 137.77056462 -46.4375 134 C-48.12818436 132.35770223 -49.79135499 130.68693869 -51.4375 129 C-54.05816788 126.34986219 -56.68566349 123.70652142 -59.3125 121.0625 C-59.99441406 120.37220703 -60.67632812 119.68191406 -61.37890625 118.97070312 C-65.0745352 115.25747594 -68.83872009 111.73348067 -72.8515625 108.36645508 C-75.17228816 106.36690127 -77.29371967 104.18623143 -79.4375 102 C-80.23929688 101.24460937 -81.04109375 100.48921875 -81.8671875 99.7109375 C-95.74168031 86.45702904 -103.32721663 70.45436339 -103.875 51.1875 C-103.70829682 32.73456893 -96.55826514 16.97840603 -83.4375 4 C-82.66212891 3.17435547 -82.66212891 3.17435547 -81.87109375 2.33203125 C-59.91374317 -19.05202036 -23.53094789 -17.09739285 0 0 Z " fill={disabled?'#FFFFFF26':'#FFFFFF'} transform="translate(168.4375,112)" />
        </svg>
    );
};