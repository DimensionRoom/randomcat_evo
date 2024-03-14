import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export default ({ width = '100%', height = '100%', className }: Props) => {
    return (
        <svg width={width} height={height} viewBox="0 0 1000 1000" fill="none" shapeRendering="geometricPrecision">
            <path d="M0 0 C0.95485165 -0.00407553 1.90970329 -0.00815105 2.89348984 -0.01235008 C7.96837895 -0.03315163 13.04324168 -0.04746706 18.11816406 -0.05688477 C22.24494592 -0.06565745 26.37138143 -0.08633033 30.49804688 -0.1184082 C55.07981103 -0.30526297 78.95096539 0.19374161 103.2421875 4.23828125 C104.4718222 4.44216461 105.70145691 4.64604797 106.96835327 4.85610962 C177.73667451 16.76258249 244.62435896 42.81053476 304.3671875 82.48828125 C304.92546234 82.85869537 305.48373718 83.2291095 306.05892944 83.61074829 C313.99251861 88.89153578 321.67640923 94.44416535 329.2421875 100.23828125 C330.25345703 101.01171875 330.25345703 101.01171875 331.28515625 101.80078125 C343.59202189 111.28039397 355.36878714 121.28919365 366.74951172 131.85888672 C368.26132675 133.255968 369.78313354 134.64127663 371.30859375 136.0234375 C379.72384353 143.65528163 387.96170363 151.41774978 395.34765625 160.06640625 C397.21611856 162.20839604 399.14501152 164.28521935 401.08813477 166.359375 C407.07875567 172.77603728 412.5243337 179.51231065 417.87158203 186.46923828 C419.2174647 188.20637149 420.58276615 189.92588659 421.95703125 191.640625 C479.81963429 263.94548421 514.65377004 353.57705371 525.2421875 445.23828125 C525.32839859 445.87286255 525.41460968 446.50744385 525.50343323 447.16125488 C526.62460958 456.39585088 526.44664828 465.70867194 526.48046875 474.99609375 C526.48454428 475.9509454 526.4886198 476.90579704 526.49281883 477.88958359 C526.51362038 482.9644727 526.52793581 488.03933543 526.53735352 493.11425781 C526.5461262 497.24103967 526.56679908 501.36747518 526.59887695 505.49414062 C526.78573172 530.07590478 526.28672714 553.94705914 522.2421875 578.23828125 C522.03830414 579.46791595 521.83442078 580.69755066 521.62435913 581.96444702 C509.71788626 652.73276826 483.66993399 719.62045271 443.9921875 779.36328125 C443.62177338 779.92155609 443.25135925 780.47983093 442.86972046 781.05502319 C437.58893297 788.98861236 432.0363034 796.67250298 426.2421875 804.23828125 C425.46875 805.24955078 425.46875 805.24955078 424.6796875 806.28125 C415.20007478 818.58811564 405.1912751 830.36488089 394.62158203 841.74560547 C393.22450075 843.2574205 391.83919212 844.77922729 390.45703125 846.3046875 C382.82518712 854.71993728 375.06271897 862.95779738 366.4140625 870.34375 C364.27207271 872.21221231 362.1952494 874.14110527 360.12109375 876.08422852 C353.70443147 882.07484942 346.9681581 887.52042745 340.01123047 892.86767578 C338.27409726 894.21355845 336.55458216 895.5788599 334.83984375 896.953125 C269.67800297 949.09946436 191.75256507 980.87258164 110.2421875 996.23828125 C109.25802856 996.4322348 108.27386963 996.62618835 107.2598877 996.82601929 C82.81292318 1001.501887 58.00944797 1000.85137613 33.22314453 1000.75976562 C26.99396191 1000.73697755 20.76546277 1000.75051453 14.53630352 1000.77352619 C-34.59630391 1000.92778458 -34.59630391 1000.92778458 -58.7578125 996.23828125 C-60.37327551 995.95513693 -61.98929168 995.67512241 -63.60595703 995.39892578 C-67.61220818 994.69726191 -71.59114519 993.89393343 -75.5703125 993.05078125 C-76.26195496 992.90588257 -76.95359741 992.76098389 -77.66619873 992.61169434 C-140.29214654 979.42301435 -199.60161891 954.37458189 -252.8828125 918.98828125 C-253.72022476 918.43266006 -253.72022476 918.43266006 -254.57455444 917.86581421 C-262.50814361 912.58502672 -270.19203423 907.03239715 -277.7578125 901.23828125 C-278.43199219 900.72265625 -279.10617187 900.20703125 -279.80078125 899.67578125 C-292.10764689 890.19616853 -303.88441214 880.18736885 -315.26513672 869.61767578 C-316.77695175 868.2205945 -318.29875854 866.83528587 -319.82421875 865.453125 C-328.23946853 857.82128087 -336.47732863 850.05881272 -343.86328125 841.41015625 C-345.73174356 839.26816646 -347.66063652 837.19134315 -349.60375977 835.1171875 C-355.59438067 828.70052522 -361.0399587 821.96425185 -366.38720703 815.00732422 C-367.7330897 813.27019101 -369.09839115 811.55067591 -370.47265625 809.8359375 C-422.61899561 744.67409672 -454.39211289 666.74865882 -469.7578125 585.23828125 C-469.95176605 584.25412231 -470.1457196 583.26996338 -470.34555054 582.25598145 C-475.02141825 557.80901693 -474.37090738 533.00554172 -474.27929688 508.21923828 C-474.2565088 501.99005566 -474.27004578 495.76155652 -474.29305744 489.53239727 C-474.44731583 440.39978984 -474.44731583 440.39978984 -469.7578125 416.23828125 C-469.47466818 414.62281824 -469.19465366 413.00680207 -468.91845703 411.39013672 C-468.21679316 407.38388557 -467.41346468 403.40494856 -466.5703125 399.42578125 C-466.35296448 398.38831757 -466.35296448 398.38831757 -466.13122559 397.32989502 C-452.9425456 334.70394721 -427.89411314 275.39447484 -392.5078125 222.11328125 C-391.95219131 221.27586899 -391.95219131 221.27586899 -391.38534546 220.42153931 C-386.10455797 212.48795014 -380.5519284 204.80405952 -374.7578125 197.23828125 C-374.2421875 196.56410156 -373.7265625 195.88992187 -373.1953125 195.1953125 C-363.71569978 182.88844686 -353.7069001 171.11168161 -343.13720703 159.73095703 C-341.74012575 158.219142 -340.35481712 156.69733521 -338.97265625 155.171875 C-331.34081212 146.75662522 -323.57834397 138.51876512 -314.9296875 131.1328125 C-312.78769771 129.26435019 -310.7108744 127.33545723 -308.63671875 125.39233398 C-302.22005647 119.40171308 -295.4837831 113.95613505 -288.52685547 108.60888672 C-286.78972226 107.26300405 -285.07020716 105.8977026 -283.35546875 104.5234375 C-211.05060954 46.66083446 -121.41904004 11.82669871 -29.7578125 1.23828125 C-29.1232312 1.15207016 -28.4886499 1.06585907 -27.83483887 0.97703552 C-18.60024287 -0.14414083 -9.28742181 0.03382047 0 0 Z " fill="#CE1125" transform="translate(473.7578125,-0.23828125)" />
            <path d="M0 0 C125.07 0 250.14 0 379 0 C372.02967027 31.36648379 372.02967027 31.36648379 369.25 40.375 C368.75149536 42.01505005 368.75149536 42.01505005 368.24291992 43.68823242 C367.18252558 47.13237566 366.09731066 50.56744934 365 54 C364.62891113 55.16257324 364.25782227 56.32514648 363.87548828 57.52294922 C349.92090765 100.69881179 329.83317102 141.35724054 304.75 179.125 C304.19437881 179.96241226 304.19437881 179.96241226 303.62753296 180.81674194 C298.34674547 188.75033111 292.7941159 196.43422173 287 204 C286.484375 204.67417969 285.96875 205.34835937 285.4375 206.04296875 C275.95788728 218.34983439 265.9490876 230.12659964 255.37939453 241.50732422 C253.98231325 243.01913925 252.59700462 244.54094604 251.21484375 246.06640625 C243.58299962 254.48165603 235.82053147 262.71951613 227.171875 270.10546875 C225.02988521 271.97393106 222.9530619 273.90282402 220.87890625 275.84594727 C214.46224397 281.83656817 207.7259706 287.2821462 200.76904297 292.62939453 C199.03190976 293.9752772 197.31239466 295.34057865 195.59765625 296.71484375 C147.2147082 335.43372582 65.07157423 389 0 389 C0 260.63 0 132.26 0 0 Z " fill="#FDFDFD" transform="translate(613,600)" />
            <path d="M0 0 C10.14732473 1.12748053 10.14732473 1.12748053 14.87890625 2.4609375 C15.94802246 2.76153076 17.01713867 3.06212402 18.11865234 3.37182617 C19.82335693 3.86839722 19.82335693 3.86839722 21.5625 4.375 C22.77631348 4.72731689 23.99012695 5.07963379 25.24072266 5.44262695 C75.07692828 20.15354359 121.80058576 41.47641885 165.125 70.25 C165.96241226 70.80562119 165.96241226 70.80562119 166.81674194 71.37246704 C174.75033111 76.65325453 182.43422173 82.2058841 190 88 C190.67417969 88.515625 191.34835937 89.03125 192.04296875 89.5625 C204.34983439 99.04211272 216.12659964 109.0509124 227.50732422 119.62060547 C229.01913925 121.01768675 230.54094604 122.40299538 232.06640625 123.78515625 C240.48165603 131.41700038 248.71951613 139.17946853 256.10546875 147.828125 C257.97393106 149.97011479 259.90282402 152.0469381 261.84594727 154.12109375 C267.83656817 160.53775603 273.2821462 167.2740294 278.62939453 174.23095703 C279.9752772 175.96809024 281.34057865 177.68760534 282.71484375 179.40234375 C328.29128774 236.3544716 359.35282382 304.19881632 376 375 C376.32242676 376.34529785 376.32242676 376.34529785 376.65136719 377.71777344 C377.47816294 381.26303899 378 384.34003576 378 388 C253.26 388 128.52 388 0 388 C0 259.96 0 131.92 0 0 Z " fill="#FDFDFD" transform="translate(613,12)" />
            <path d="M0 0 C124.74 0 249.48 0 378 0 C378 128.37 378 256.74 378 389 C320.79679942 381.84959993 261.12075843 350.12791215 213.875 318.75 C213.03758774 318.19437881 213.03758774 318.19437881 212.18325806 317.62753296 C204.24966889 312.34674547 196.56577827 306.7941159 189 301 C188.32582031 300.484375 187.65164062 299.96875 186.95703125 299.4375 C174.65016561 289.95788728 162.87340036 279.9490876 151.49267578 269.37939453 C149.98086075 267.98231325 148.45905396 266.59700462 146.93359375 265.21484375 C138.51834397 257.58299962 130.28048387 249.82053147 122.89453125 241.171875 C121.02606894 239.02988521 119.09717598 236.9530619 117.15405273 234.87890625 C111.16343183 228.46224397 105.7178538 221.7259706 100.37060547 214.76904297 C99.0247228 213.03190976 97.65942135 211.31239466 96.28515625 209.59765625 C47.43662639 148.55674401 16.29472352 76.04204311 0 0 Z " fill="#FDFDFD" transform="translate(7,600)" />
            <path d="M0 0 C0 128.04 0 256.08 0 388 C-124.41 388 -248.82 388 -377 388 C-371.98499185 342.86492662 -352.14795178 298.19806828 -332 258 C-331.5477002 257.09282227 -331.09540039 256.18564453 -330.62939453 255.25097656 C-318.18640241 230.44273066 -302.99574846 206.92808105 -286 185 C-285.37061523 184.18354004 -285.37061523 184.18354004 -284.72851562 183.35058594 C-275.13414405 170.91992204 -265.06448472 158.99765211 -254.37939453 147.49267578 C-252.98231325 145.98086075 -251.59700462 144.45905396 -250.21484375 142.93359375 C-242.58299962 134.51834397 -234.82053147 126.28048387 -226.171875 118.89453125 C-224.02988521 117.02606894 -221.9530619 115.09717598 -219.87890625 113.15405273 C-213.46224397 107.16343183 -206.7259706 101.7178538 -199.76904297 96.37060547 C-198.03190976 95.0247228 -196.31239466 93.65942135 -194.59765625 92.28515625 C-146.69408767 53.94990184 -64.52017517 0 0 0 Z " fill="#FDFDFD" transform="translate(385,12)" />
            <path d="M0 0 C0 81.84 0 163.68 0 248 C-4.8218339 245.93349976 -9.48235918 243.81145038 -14.12890625 241.41015625 C-14.79140884 241.06983368 -15.45391144 240.72951111 -16.13648987 240.37887573 C-18.27997698 239.27626977 -20.42137094 238.16967726 -22.5625 237.0625 C-23.30119324 236.68151154 -24.03988647 236.30052307 -24.80096436 235.9079895 C-34.49539611 230.90624103 -44.12447678 225.80714607 -53.67211914 220.52954102 C-61.53825676 216.20202786 -69.51218958 212.09668865 -77.5 208 C-87.40699335 202.91865574 -97.24512842 197.74402382 -106.99609375 192.3671875 C-114.82985815 188.05920082 -122.75967657 183.94821552 -130.70263672 179.84594727 C-138.22763134 175.94909573 -145.66949067 171.92119684 -153.08496094 167.82055664 C-158.88666553 164.63609563 -164.74325268 161.57641248 -170.640625 158.57421875 C-171.39142334 158.19127655 -172.14222168 157.80833435 -172.91577148 157.41378784 C-176.67488202 155.49787841 -180.43839991 153.59146898 -184.20898438 151.69824219 C-185.59258769 150.99571793 -186.97605751 150.29293066 -188.359375 149.58984375 C-189.3218515 149.11245003 -189.3218515 149.11245003 -190.30377197 148.62541199 C-193.48820136 146.99720937 -194.96892103 146.04661846 -197 143 C-196.35933594 142.29875 -195.71867187 141.5975 -195.05859375 140.875 C-189.34396946 134.61629778 -189.34396946 134.61629778 -183.75 128.25 C-173.59334555 116.57706775 -162.96904243 104.99815466 -151.20703125 94.9296875 C-149.05404031 93.0472494 -146.96370675 91.10685388 -144.87670898 89.15185547 C-138.4604996 83.16228072 -131.72515453 77.71722655 -124.76904297 72.37060547 C-123.03190976 71.0247228 -121.31239466 69.65942135 -119.59765625 68.28515625 C-34.26881949 0 -34.26881949 0 0 0 Z " fill="#00237D" transform="translate(310,36)" />
            <path d="M0 0 C0 81.51 0 163.02 0 247 C-3.8668682 246.22662636 -6.42125276 245.51156675 -9.89453125 243.91796875 C-11.30919678 243.27142334 -11.30919678 243.27142334 -12.75244141 242.61181641 C-13.76226074 242.14179199 -14.77208008 241.67176758 -15.8125 241.1875 C-16.87130371 240.69685059 -17.93010742 240.20620117 -19.02099609 239.70068359 C-43.46106478 228.30254365 -66.66743421 215.6776555 -89.125 200.75 C-89.68273102 200.37985779 -90.24046204 200.00971558 -90.81509399 199.62835693 C-98.74928067 194.34731764 -106.43371308 188.79450545 -114 183 C-114.67417969 182.484375 -115.34835938 181.96875 -116.04296875 181.4375 C-128.34983439 171.95788728 -140.12659964 161.9490876 -151.50732422 151.37939453 C-153.01913925 149.98231325 -154.54094604 148.59700462 -156.06640625 147.21484375 C-164.47086488 139.59278618 -172.70322672 131.84229155 -180.078125 123.203125 C-181.60407962 121.45385995 -183.15277199 119.74499446 -184.734375 118.046875 C-185.22107666 117.52335449 -185.70777832 116.99983398 -186.20922852 116.46044922 C-187.16730906 115.43290585 -188.12854881 114.40829546 -189.09350586 113.38720703 C-192.14410913 110.1075201 -194.61306265 106.7676716 -197 103 C-196.41847168 102.69932617 -195.83694336 102.39865234 -195.23779297 102.08886719 C-184.51691784 96.53859609 -173.82697137 90.9455679 -163.25 85.125 C-153.91967374 79.99391248 -144.48511337 75.08324022 -135.01953125 70.20703125 C-128.04354813 66.60422498 -121.12435598 62.91774813 -114.25 59.125 C-104.75039059 53.8867653 -95.12675579 48.91178171 -85.4753418 43.96154785 C-76.29271183 39.24904306 -67.18635753 34.42665627 -58.14892578 29.43969727 C-49.82450746 24.86258312 -41.3868452 20.5139217 -32.93847656 16.17089844 C-24.86681802 12.00811235 -16.88931691 7.7009234 -9.00146484 3.19897461 C-8.24816895 2.77495361 -7.49487305 2.35093262 -6.71875 1.9140625 C-5.74325195 1.3564624 -5.74325195 1.3564624 -4.74804688 0.78759766 C-3 0 -3 0 0 0 Z " fill="#00237D" transform="translate(310,718)" />
            <path d="M0 0 C5.81231726 1.93743909 11.0763355 3.80661302 16.5 6.4765625 C17.17370636 6.80293701 17.84741272 7.12931152 18.54153442 7.46557617 C20.69745183 8.51250275 22.84900805 9.56799487 25 10.625 C26.49722669 11.35727217 27.99445979 12.08953122 29.49169922 12.82177734 C33.66746611 14.86848016 37.83581132 16.92985314 42 19 C42.93102539 19.46277344 43.86205078 19.92554687 44.82128906 20.40234375 C68.90065734 32.48780615 91.72132789 47.50758747 113 64 C113.54430664 64.41958984 114.08861328 64.83917969 114.64941406 65.27148438 C127.08007796 74.86585595 139.00234789 84.93551528 150.50732422 95.62060547 C152.01913925 97.01768675 153.54094604 98.40299538 155.06640625 99.78515625 C163.470931 107.40727378 171.6947956 115.16150509 179.078125 123.79296875 C182.01126767 127.16131349 185.05342333 130.42886009 188.09350586 133.70068359 C196 142.25786526 196 142.25786526 196 145 C195.35788574 145.3309668 194.71577148 145.66193359 194.05419922 146.00292969 C182.80672766 151.80743197 171.58124444 157.63313609 160.5 163.75 C150.54627324 169.23723965 140.45054978 174.42879493 130.33496094 179.60864258 C120.78217115 184.50298651 111.30063159 189.49686948 101.90234375 194.68359375 C94.10348394 198.97708369 86.20645509 203.06928813 78.296875 207.15429688 C71.64689905 210.59803442 65.05651915 214.13195092 58.5 217.75 C49.08405778 222.93598688 39.55810611 227.89532712 30 232.8125 C28.96081421 233.3474408 28.96081421 233.3474408 27.90063477 233.89318848 C18.63196766 238.66076531 9.32343866 243.33828067 0 248 C0 166.16 0 84.32 0 0 Z " fill="#00237D" transform="translate(690,36)" />
            <path d="M0 0 C4.58840881 1.5294696 8.34972232 3.07680739 12.59375 5.2734375 C13.21336609 5.59302429 13.83298218 5.91261108 14.47137451 6.24188232 C16.48335439 7.28162358 18.49178003 8.3280175 20.5 9.375 C21.90587186 10.10410538 23.31179686 10.8331083 24.71777344 11.56201172 C33.48942383 16.11980035 42.195809 20.7854228 50.8515625 25.56005859 C58.00640638 29.49442656 65.24150444 33.2608367 72.5 37 C80.64035441 41.19344674 88.73233152 45.45145877 96.75 49.875 C106.25026399 55.11359564 115.87454174 60.08898157 125.52667236 65.03945923 C134.65201724 69.72242344 143.70221498 74.51229085 152.6796875 79.47460938 C161.78157806 84.48201174 171.0249277 89.21289234 180.28173828 93.92602539 C181.46908609 94.53399629 182.6564238 95.14198691 183.84375 95.75 C184.88724609 96.28109375 185.93074219 96.8121875 187.00585938 97.359375 C190.14983594 99.08210189 193.04714357 100.97115167 196 103 C192.05624706 108.47907975 187.84930315 113.49716364 183.1875 118.375 C181.94455766 119.68939077 180.70236968 121.0044953 179.4609375 122.3203125 C178.86506836 122.95098633 178.26919922 123.58166016 177.65527344 124.23144531 C175.4995341 126.53471607 173.40314982 128.88764118 171.3125 131.25 C164.68922851 138.64885904 157.69846291 145.69857115 150.13671875 152.140625 C148.00568222 153.99505533 145.94241937 155.91250203 143.88110352 157.84375 C137.46398745 163.83541616 130.72678677 169.28151887 123.76904297 174.62939453 C122.03190976 175.9752772 120.31239466 177.34057865 118.59765625 178.71484375 C33.26881949 247 33.26881949 247 0 247 C0 165.49 0 83.98 0 0 Z " fill="#00237D" transform="translate(690,718)" />
            <path d="M0 0 C3.53645157 0.06348593 7.0730349 0.06846203 10.60996842 0.08025408 C17.27542712 0.11105668 23.93920105 0.19272409 30.60392529 0.29374897 C38.20494856 0.406409 45.80606209 0.46072458 53.40771544 0.51070333 C69.01500249 0.61459493 84.62051108 0.79199116 100.22659135 1.01393938 C100.22659135 5.63393938 100.22659135 10.25393938 100.22659135 15.01393938 C99.32642289 15.47655169 98.42625443 15.93916399 97.49880815 16.41579485 C75.07947381 27.93508463 75.07947381 27.93508463 52.75002885 39.62722063 C47.42025467 42.4445912 42.07305518 45.22840891 36.72659135 48.01393938 C29.76002878 51.64432063 22.79990909 55.28626147 15.85159135 58.95143938 C7.41253825 63.40217287 -1.0521899 67.80280112 -9.5195024 72.19948626 C-15.73939953 75.43094685 -21.95004808 78.67887838 -28.14840865 81.95143938 C-35.83721132 86.01016274 -43.55251669 90.01663227 -51.27340865 94.01393938 C-59.03557819 98.03276957 -66.79241137 102.06042771 -74.52340865 106.13893938 C-81.57897521 109.86059079 -88.64125143 113.56911206 -95.71090865 117.26393938 C-96.63419967 117.74749895 -97.55749068 118.23105852 -98.50876021 118.72927141 C-105.22487577 122.23630921 -111.98740194 125.64427473 -118.77340865 129.01393938 C-138.47289954 99.77534519 -138.47289954 99.77534519 -145.77340865 87.01393938 C-146.6170616 85.56466413 -147.46081683 84.11544842 -148.30465865 82.66628313 C-149.14956133 81.19949858 -149.99333697 79.73206418 -150.83590865 78.26393938 C-151.23108687 77.58307268 -151.6262651 76.90220598 -152.03341842 76.20070696 C-154.77340865 71.3609801 -154.77340865 71.3609801 -154.77340865 68.01393938 C-154.07070846 67.65267962 -153.36800826 67.29141985 -152.64401412 66.91921282 C-140.83074107 60.83876696 -129.02481476 54.75942827 -117.39840865 48.32643938 C-107.46594595 42.84008002 -97.37776188 37.67379647 -87.27340865 32.51393938 C-76.2340075 26.87631179 -65.2216536 21.21517514 -54.38473678 15.19362688 C-52.87080239 14.35299143 -51.34709668 13.52974866 -49.81483626 12.72300005 C-47.48872973 11.4158977 -45.3464543 10.06252066 -43.14262557 8.57428789 C-29.25659818 -0.29910999 -16.07597943 -0.33847404 0 0 Z " fill="#CE1125" transform="translate(210.77340865135193,665.9860606193542)" />
            <path d="M0 0 C4.67233743 4.23971359 7.87569907 9.0700243 11.25 14.375 C11.82210205 15.26622559 12.3942041 16.15745117 12.98364258 17.07568359 C17.81047972 24.62867065 22.50851035 32.24318405 27 40 C27.45101074 40.7724707 27.90202148 41.54494141 28.36669922 42.34082031 C29.79881353 44.80349436 31.21423158 47.27504564 32.625 49.75 C33.30115356 50.91329834 33.30115356 50.91329834 33.9909668 52.10009766 C34.39871338 52.82503418 34.80645996 53.5499707 35.2265625 54.296875 C35.59346191 54.93979492 35.96036133 55.58271484 36.33837891 56.24511719 C37 58 37 58 36 61 C33.57348633 62.52709961 33.57348633 62.52709961 30.33203125 64.15234375 C29.74964188 64.44836487 29.1672525 64.74438599 28.56721497 65.04937744 C27.31014373 65.68722881 26.050846 66.32070701 24.78961182 66.95028687 C21.44743618 68.61910481 18.12138832 70.31958565 14.79296875 72.015625 C14.12406616 72.35534836 13.45516357 72.69507172 12.76599121 73.04508972 C6.99185834 75.98413678 1.29644644 79.05489601 -4.375 82.1875 C-11.70109136 86.22341847 -19.07345795 90.15199581 -26.5 94 C-34.1322414 97.95552237 -41.71277741 101.99123504 -49.25 106.125 C-56.24795838 109.9605938 -63.25837436 113.76851035 -70.3125 117.5 C-71.05854492 117.89719238 -71.80458984 118.29438477 -72.57324219 118.70361328 C-73.96159579 119.4347377 -75.35572252 120.1550621 -76.75680637 120.86148453 C-78.16089754 121.57412007 -79.55502066 122.30716294 -80.93270016 123.06960678 C-87.55381883 126.45171796 -93.53111407 126.54392971 -100.86352539 126.45410156 C-102.12305023 126.45468567 -103.38257507 126.45526978 -104.68026733 126.45587158 C-108.10754433 126.45701155 -111.53425264 126.43362035 -114.96139836 126.40557575 C-118.55280315 126.38044105 -122.14422334 126.37821065 -125.73570251 126.37347412 C-132.52476841 126.36107955 -139.31357432 126.32830618 -146.10252613 126.28807616 C-153.83652909 126.24324826 -161.57054496 126.22134383 -169.30464566 126.20129442 C-185.2032514 126.15956994 -201.10158183 126.08847418 -217 126 C-217 121.71 -217 117.42 -217 113 C-215.34355469 112.17757812 -213.68710937 111.35515625 -211.98046875 110.5078125 C-199.37985218 104.23818677 -186.84251089 97.87643135 -174.41210938 91.27441406 C-170.92403597 89.43152508 -167.42211484 87.6155953 -163.92114258 85.79736328 C-155.74454115 81.5501953 -147.5975805 77.25555699 -139.48974609 72.87841797 C-124.70897436 64.9013914 -109.79365075 57.20570172 -94.82666016 49.58422852 C-84.18592771 44.16333494 -73.59583494 38.65496861 -63.03762817 33.07510376 C-58.53433202 30.69905169 -54.01646521 28.35088669 -49.5 26 C-40.11881275 21.1108794 -30.75199117 16.19514762 -21.39404297 11.26171875 C-17.03456883 8.96417007 -12.6734071 6.66982729 -8.3125 4.375 C-6.70442034 3.52865865 -5.09634676 2.68230574 -3.48828125 1.8359375 C-2.33714844 1.23007813 -1.18601562 0.62421875 0 0 Z " fill="#CE1125" transform="translate(907,208)" />
            <path d="M0 0 C10.78057225 -0.11704121 21.56080673 -0.20928019 32.34191132 -0.25835419 C35.41703229 -0.27308402 38.49184494 -0.29739903 41.56682587 -0.33013153 C45.18986038 -0.3682606 48.81247671 -0.3866551 52.43570518 -0.39019585 C54.37293094 -0.39675408 56.31006014 -0.42293254 58.24710846 -0.4499588 C65.85222123 -0.43128167 72.52892758 0.45587995 79.35170746 4.02875519 C80.35170746 6.02875519 80.35170746 6.02875519 79.70937347 8.30243683 C78.45921964 11.57175086 77.20206534 14.83654724 75.91420746 18.09125519 C75.43209808 19.31449493 74.94998871 20.53773468 74.45326996 21.7980423 C70.33306784 32.09216728 65.68390874 42.1145689 60.85170746 52.09125519 C60.50141479 52.81829651 60.15112213 53.54533783 59.79021454 54.29441071 C58.78775968 56.36759554 57.77526478 58.43548032 56.75795746 60.50141144 C56.30851021 61.42772369 56.30851021 61.42772369 55.84998322 62.37274933 C54.34986272 65.37898116 52.93052598 67.8407705 50.35170746 70.02875519 C17.35599593 53.07168228 17.35599593 53.07168228 2.85951996 45.40766144 C-2.3828025 42.63665267 -7.64035404 39.89498735 -12.89829254 37.15375519 C-14.34147858 36.40122467 -14.34147858 36.40122467 -15.81381989 35.63349152 C-18.75849895 34.09830074 -21.70336249 32.56346444 -24.64829254 31.02875519 C-63.61748432 10.72050399 -63.61748432 10.72050399 -79.64829254 2.02875519 C-79.64829254 1.69875519 -79.64829254 1.36875519 -79.64829254 1.02875519 C-54.87882878 0.6442269 -30.10891638 0.31896852 -5.33784485 0.05726624 C-3.55856081 0.03840464 -1.77927913 0.01931943 0 0 Z " fill="#CE1327" transform="translate(891.6482925415039,665.9712448120117)" />
            <path d="M0 0 C4.34037464 1.33887457 8.23675935 3.0253927 12.26171875 5.125 C12.84514542 5.42785919 13.42857208 5.73071838 14.02967834 6.04275513 C15.91785009 7.02428605 17.80268883 8.01203358 19.6875 9 C21.00470092 9.68638434 22.32208531 10.37241667 23.63964844 11.05810547 C31.42411869 15.11319939 39.19638712 19.19189648 46.95776367 23.29101562 C53.45703016 26.72261702 59.97728177 30.11322284 66.5 33.5 C74.63977371 37.72696375 82.76916333 41.97234204 90.88085938 46.25292969 C95.21412778 48.53818201 99.55314819 50.81189382 103.8984375 53.07421875 C104.91212402 53.60200928 105.92581055 54.1297998 106.97021484 54.67358398 C108.92056892 55.68836531 110.8713794 56.70227018 112.82275391 57.71508789 C119.25938985 61.0641805 125.64186062 64.50425316 132 68 C132 68.33 132 68.66 132 69 C112.31987044 69.09351118 92.63978607 69.16401244 72.95948029 69.20724869 C63.82121852 69.22785914 54.68309494 69.25595068 45.54492188 69.30175781 C37.57851934 69.34167209 29.6122169 69.36744384 21.64571714 69.37635398 C17.42889227 69.38156098 13.21235369 69.39376749 8.99562073 69.42292023 C5.02293461 69.45016203 1.05065151 69.45842743 -2.92211914 69.45243073 C-4.37653293 69.45352706 -5.83096083 69.46142891 -7.28529358 69.4768219 C-15.28574819 69.55731458 -21.17466579 69.38170776 -28 65 C-27.00136067 59.35885047 -24.92964883 54.3037937 -22.8125 49 C-22.38122803 47.91871826 -21.94995605 46.83743652 -21.50561523 45.72338867 C-15.15024761 30.1088983 -7.54134304 15.06725263 0 0 Z " fill="#CE1125" transform="translate(56,264)" />
            <path d="M0 0 C0.66 0 1.32 0 2 0 C2 3.63 2 7.26 2 11 C44.9 11 87.8 11 132 11 C128.66288201 13.22474533 127.63081093 13.24806766 123.74189758 13.24050903 C122.65234772 13.24325836 121.56279785 13.24600769 120.44023132 13.24884033 C119.24477188 13.24164978 118.04931244 13.23445923 116.81762695 13.22705078 C115.55897827 13.22734283 114.30032959 13.22763489 113.00354004 13.22793579 C109.55129148 13.22851021 106.09918157 13.21674148 102.64696527 13.20278788 C99.03948686 13.19029542 95.43200537 13.18911119 91.82450867 13.18673706 C84.99283779 13.18051792 78.16123083 13.16410124 71.32958812 13.14403808 C63.55216645 13.12169258 55.77474175 13.11068905 47.99729598 13.10064721 C31.99815927 13.07973538 15.99909038 13.04414868 0 13 C0 8.71 0 4.42 0 0 Z " fill="#D63C4C" transform="translate(690,321)" />
        </svg>
    );
};