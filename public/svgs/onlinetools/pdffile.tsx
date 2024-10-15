import React from "react";

export interface Props {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

export default ({ width = "100%", height = "100%", className, color="#ffffff" }: Props) => {
  return (
    <svg width={width} height={height} className={className} viewBox="0 0 512 512" shapeRendering='auto'>
      <path
        d="M0 0 C2.00869889 -0.04149743 4.01737099 -0.08430882 6.02601624 -0.12832642 C12.59372429 -0.26346662 19.16167335 -0.3551209 25.73022461 -0.43798828 C27.41444366 -0.45971784 27.41444366 -0.45971784 29.13268733 -0.48188639 C39.75020144 -0.61629254 50.36779614 -0.73241478 60.9858942 -0.80894279 C74.49464145 -0.90766497 87.99599424 -1.09269187 101.50172144 -1.39676654 C111.03851093 -1.60407578 120.57332153 -1.70944818 130.11228651 -1.74228299 C135.79071762 -1.76453536 141.46061467 -1.82913238 147.13655281 -2.0045433 C185.62198722 -3.13995566 185.62198722 -3.13995566 198.44552964 8.23352563 C203.42180776 13.00407455 207.77079332 18.26140955 211.83189201 23.82172775 C215.91643057 29.37861936 220.52858647 34.47248426 225.44506836 39.30419922 C226.20303711 40.05443359 226.96100586 40.80466797 227.74194336 41.57763672 C228.51022461 42.33302734 229.27850586 43.08841797 230.07006836 43.86669922 C238.6357067 52.28861879 238.6357067 52.28861879 242.53881836 56.83544922 C246.63209593 61.59836436 251.09653773 65.96384048 255.57006836 70.36669922 C260.65967762 75.37590391 265.60011437 80.40692703 270.25170898 85.82568359 C273.83849524 89.85166816 277.72859658 93.5859142 281.57006836 97.36669922 C286.67102564 102.38707265 291.62160382 107.42984779 296.28295898 112.86132812 C300.41022183 117.49265832 304.95256241 121.7453155 309.39819336 126.06787109 C323.83468089 140.2956679 323.83468089 140.2956679 324.19771886 147.34556705 C324.19896536 148.3423383 324.20021185 149.33910956 324.20149612 150.36608601 C324.20533727 151.5164293 324.20917841 152.6667726 324.21313596 153.85197479 C324.21226948 155.12159047 324.21140299 156.39120616 324.21051025 157.69929504 C324.21309338 159.05721629 324.2161064 160.41513678 324.21951365 161.77305621 C324.22759383 165.51317431 324.2293738 169.25327323 324.23011112 172.99339902 C324.23196005 177.02433181 324.23950684 181.05525461 324.24624634 185.08618164 C324.25984004 193.90690926 324.26585673 202.72763234 324.270257 211.54836869 C324.27301913 217.05839207 324.27725658 222.5684137 324.28176117 228.0784359 C324.29395796 243.33857138 324.30425466 258.59870546 324.30763626 273.85884571 C324.30785583 274.8359978 324.30807539 275.81314989 324.30830161 276.81991265 C324.30851989 277.79939971 324.30873817 278.77888676 324.30896306 279.78805524 C324.30940652 281.77284737 324.30985309 283.75763951 324.31030273 285.74243164 C324.31052416 286.72695628 324.31074559 287.71148092 324.31097373 288.72583964 C324.31491715 304.65943316 324.33235537 320.59298082 324.35566226 336.52655665 C324.37940646 352.89156063 324.3918396 369.25654165 324.39300418 385.62156314 C324.39391951 394.80717539 324.39963554 403.99272797 324.41782379 413.17832375 C324.43326661 421.00504455 324.43832087 428.83168727 324.43008569 436.65842042 C324.42619319 440.64798447 324.42703963 444.63739149 324.44114304 448.62693596 C324.45396741 452.28839339 324.45261054 455.9495772 324.44055232 459.61103471 C324.43769857 461.54411629 324.44946643 463.47720298 324.46197438 465.41024619 C324.39388658 477.59224351 323.17545947 489.32444333 315.07006836 498.86669922 C314.48225586 499.57568359 313.89444336 500.28466797 313.28881836 501.01513672 C307.69886236 507.17783411 299.24092132 512.53089629 290.70316505 512.99550039 C289.75944731 512.99728896 288.81572956 512.99907753 287.84341431 513.0009203 C286.75392203 513.00537814 285.66442976 513.00983598 284.54192257 513.01442891 C283.34029759 513.01424455 282.13867262 513.01406019 280.90063477 513.01387024 C278.99120386 513.01938527 278.99120386 513.01938527 277.04319859 513.02501172 C273.50251921 513.03503567 269.96185678 513.03874916 266.42116523 513.04140103 C262.60501366 513.04530303 258.78887554 513.0548816 254.97273254 513.06361389 C245.75175328 513.08338357 236.5307729 513.09344618 227.30977774 513.10234168 C222.96678184 513.10672467 218.62378717 513.11209154 214.28079224 513.11733055 C199.84160109 513.13434505 185.4024107 513.1488382 170.96321106 513.15607929 C167.21546426 513.15798918 163.46771747 513.15990951 159.7199707 513.16186523 C158.32274995 513.16259084 158.32274995 513.16259084 156.89730251 513.16333111 C141.81524694 513.17162753 126.73327079 513.19695688 111.65124989 513.22944591 C96.16428025 513.26253496 80.67735093 513.28052981 65.19034576 513.28372353 C56.49608946 513.28588716 47.80194888 513.29461404 39.10772705 513.32018471 C31.7014126 513.34191712 24.29524198 513.34992974 16.88889927 513.34021793 C13.11230628 513.33568025 9.33600988 513.33752796 5.55945778 513.35697937 C1.45788811 513.37792154 -2.64302694 513.36760305 -6.74462891 513.35444641 C-8.52029771 513.37090028 -8.52029771 513.37090028 -10.33183861 513.38768655 C-22.06231828 513.29703261 -31.38597832 510.02302517 -39.92993164 501.86669922 C-51.85921202 489.37048274 -51.4867517 475.86599972 -51.32055664 459.57373047 C-51.31308547 457.41469347 -51.30739668 455.25564963 -51.30340576 453.09660339 C-51.2882185 447.44616591 -51.24899671 441.79614733 -51.20458984 436.14587402 C-51.16348746 430.3673265 -51.1453629 424.58871053 -51.12524414 418.81005859 C-51.08249537 407.4954226 -51.01432852 396.1810959 -50.92993164 384.86669922 C-51.9895813 384.87336105 -53.04923096 384.88002289 -54.14099121 384.8868866 C-64.14544457 384.94780049 -74.14986011 384.99272118 -84.15445709 385.02213573 C-89.29746757 385.03776662 -94.44032788 385.0589578 -99.58325195 385.09301758 C-104.54993661 385.12570294 -109.51647716 385.14357162 -114.48326111 385.15133095 C-116.37461107 385.15685799 -118.26595349 385.16765092 -120.15724182 385.18388939 C-122.81406469 385.20578573 -125.47029815 385.20866107 -128.12719727 385.20727539 C-129.29029922 385.22345413 -129.29029922 385.22345413 -130.47689819 385.23995972 C-139.73851358 385.18796669 -146.03652119 381.65598098 -152.72290039 375.33935547 C-158.87637136 368.44528977 -160.05006398 360.40083922 -160.06364441 351.39726257 C-160.06790939 350.11465546 -160.07217438 348.83204834 -160.0765686 347.51057434 C-160.07621914 346.10153195 -160.07575764 344.69248959 -160.07519531 343.28344727 C-160.07818966 341.78979407 -160.08159283 340.29614165 -160.08537292 338.80249023 C-160.09418936 334.75484551 -160.09655005 330.70722195 -160.09718871 326.65956855 C-160.09790059 324.12772195 -160.10003752 321.59588069 -160.10268593 319.06403542 C-160.11193177 310.22261846 -160.1160218 301.38121655 -160.11523438 292.53979492 C-160.11463388 284.31237013 -160.12518204 276.08501097 -160.14097804 267.85760278 C-160.15407569 260.78223733 -160.15941733 253.70689327 -160.15877897 246.6315158 C-160.15852462 242.41093849 -160.1613407 238.19041953 -160.17195702 233.96985435 C-160.18167543 229.99797603 -160.18169164 226.02621138 -160.17444038 222.05432892 C-160.17339916 220.60196325 -160.17572978 219.14959037 -160.18180084 217.69723701 C-160.22776389 205.93372295 -159.84276594 196.14200829 -151.92993164 186.86669922 C-144.84046739 180.26616354 -137.81529811 177.39355543 -128.24072266 177.52612305 C-127.4008934 177.52568497 -126.56106415 177.52524689 -125.69578552 177.52479553 C-122.94155998 177.52687246 -120.18795606 177.55015129 -117.43383789 177.57373047 C-115.51570468 177.57933033 -113.59756715 177.58359858 -111.6794281 177.58659363 C-106.64714575 177.59801168 -101.61512589 177.62745262 -96.58294678 177.66070557 C-91.44148305 177.6914721 -86.29997664 177.70511301 -81.15844727 177.72021484 C-71.08216049 177.7523253 -61.00606795 177.80348476 -50.92993164 177.86669922 C-50.93361881 177.12439403 -50.93730598 176.38208883 -50.94110489 175.61728954 C-51.02960046 157.52107693 -51.0957114 139.42490774 -51.13718033 121.32852459 C-51.15776955 112.57709143 -51.18582018 103.82580308 -51.23168945 95.07446289 C-51.27166908 87.4431356 -51.29739089 79.81191323 -51.30628562 72.18048412 C-51.31148163 68.14296873 -51.32361729 64.10575341 -51.35285187 60.06833458 C-51.38019734 56.26061053 -51.3883385 52.45330739 -51.38236237 48.64549446 C-51.38345413 47.25522949 -51.39129366 45.86494903 -51.40675354 44.47476959 C-51.54372072 31.51203314 -49.03256633 21.40193437 -39.92993164 11.86669922 C-28.18174703 0.65151353 -15.38017061 0.21382297 0 0 Z M-25.80493164 27.67919922 C-26.63637695 28.64792969 -26.63637695 28.64792969 -27.48461914 29.63623047 C-30.4142441 34.15735439 -31.17998337 38.58788366 -31.17044067 43.90316772 C-31.17319 45.08939728 -31.17593933 46.27562683 -31.17877197 47.49780273 C-31.17158142 48.78533447 -31.16439087 50.07286621 -31.15698242 51.39941406 C-31.1564178 52.77959179 -31.15673586 54.15977013 -31.15786743 55.53994751 C-31.15843997 59.27506329 -31.14670172 63.01004994 -31.13271952 66.74513578 C-31.12019565 70.65288859 -31.11904035 74.56064453 -31.1166687 78.46841431 C-31.1104588 85.86309693 -31.09405461 93.25772024 -31.07396972 100.65237677 C-31.05159548 109.07314541 -31.04061346 117.49391692 -31.03057885 125.9147079 C-31.00968794 143.23207262 -30.97452149 160.54937964 -30.92993164 177.86669922 C-30.04240015 177.86816578 -29.15486866 177.86963234 -28.24044228 177.87114334 C-6.62276864 177.90823069 14.99474845 177.96727109 36.61229515 178.05060196 C47.06648382 178.0903738 57.5205974 178.12277574 67.97485352 178.13769531 C77.08913822 178.15072142 86.20325762 178.17771064 95.31744921 178.22131228 C100.14124059 178.24390545 104.96482823 178.25961118 109.78867722 178.25858307 C114.33435377 178.25783519 118.87958031 178.27583712 123.42514038 178.30786705 C125.08830333 178.31634586 126.75151688 178.31812975 128.41469193 178.31250191 C145.53879776 178.26230113 145.53879776 178.26230113 153.07006836 182.86669922 C153.60875738 183.40611271 154.1474464 183.9455262 154.70245934 184.50128555 C155.98386996 186.10221207 155.98386996 186.10221207 158.07006836 185.86669922 C158.3575293 186.44291016 158.64499023 187.01912109 158.94116211 187.61279297 C159.65830509 189.04459747 160.37922843 190.47451958 161.10522461 191.90185547 C161.44424805 192.57087891 161.78327148 193.23990234 162.13256836 193.92919922 C162.47416992 194.60080078 162.81577148 195.27240234 163.16772461 195.96435547 C165.02385777 199.87750201 165.20159796 202.98447453 165.21723938 207.27235413 C165.22091607 207.92531367 165.22459276 208.57827322 165.22838086 209.25101942 C165.23941101 211.44331451 165.24326044 213.63556218 165.24707031 215.82788086 C165.25333566 217.39828644 165.25998252 218.96869054 165.26698303 220.53909302 C165.2880239 225.70167 165.29838797 230.86424727 165.30834961 236.02685547 C165.31239767 237.80565341 165.31651461 239.5844512 165.32069969 241.36324883 C165.33975433 249.72362579 165.35398271 258.08399394 165.36231166 266.44438845 C165.37207437 276.08423856 165.39836741 285.72385846 165.43881255 295.36362749 C165.46902018 302.8202601 165.48378509 310.27682691 165.48709267 317.73351949 C165.48943859 322.18396718 165.49833858 326.63416901 165.52355385 331.08455086 C165.54691994 335.27644323 165.55103375 339.4679294 165.54079247 343.65987015 C165.540299 345.19245318 165.54656325 346.72505678 165.56034851 348.2575779 C165.64477098 358.20539667 164.5594026 365.96167204 159.44506836 374.61669922 C152.89761769 380.81954722 146.01778093 383.98006072 137.06562805 384.0249176 C136.34844311 384.02985558 135.63125818 384.03479356 134.89234036 384.03988117 C132.48324229 384.05526951 130.07417089 384.0636204 127.66503906 384.07202148 C125.94047815 384.08159896 124.2159196 384.09160896 122.49136353 384.10202026 C117.80368919 384.12908955 113.11600476 384.15008816 108.42829537 384.17002225 C103.53153911 384.19186932 98.63481402 384.21926426 93.73808289 384.24607849 C84.462758 384.29602269 75.18741583 384.34095512 65.9120571 384.38410085 C55.35352214 384.43345847 44.79501846 384.48838207 34.23651373 384.54378045 C12.5143944 384.65762701 -9.20775478 384.76446023 -30.92993164 384.86669922 C-30.99954064 396.59342163 -31.05279833 408.32009462 -31.08536816 420.04698181 C-31.10100257 425.49265864 -31.12220033 430.93819377 -31.15625 436.38378906 C-31.18892259 441.64224637 -31.20680138 446.90056765 -31.21456337 452.15911865 C-31.22009269 454.1621108 -31.23089008 456.16509578 -31.24712181 458.16802979 C-31.269001 460.98050845 -31.27189418 463.79242995 -31.27050781 466.60498047 C-31.28129364 467.42713547 -31.29207947 468.24929047 -31.30319214 469.09635925 C-31.26960022 475.42283701 -30.21939603 481.06466818 -26.09790039 486.10888672 C-25.11756836 486.91712891 -25.11756836 486.91712891 -24.11743164 487.74169922 C-23.47161133 488.29599609 -22.82579102 488.85029297 -22.16040039 489.42138672 C-15.78541307 493.55228919 -9.17743759 493.15628695 -1.84857178 493.14085388 C-0.62135163 493.14609056 0.60586853 493.15132724 1.87027717 493.15672261 C5.26935485 493.16911939 8.66822553 493.17256642 12.06731153 493.1721257 C15.73616243 493.17377629 19.40497587 493.1868473 23.07380676 493.19831848 C31.09246169 493.22114842 39.11109012 493.22908685 47.12977314 493.23414493 C52.13876298 493.23740412 57.14774515 493.24392792 62.15673065 493.25114632 C76.03158953 493.27070922 89.90644129 493.28711538 103.78131485 493.29002285 C104.66883949 493.29021042 105.55636413 493.29039799 106.47078346 493.29059124 C108.26992305 493.29095749 110.06906264 493.29132119 111.86820224 493.29168236 C112.76126825 493.29186517 113.65433427 493.29204798 114.57446289 493.29223633 C115.91570129 493.29250715 115.91570129 493.29250715 117.28403541 493.29278345 C131.7716841 493.29632489 146.25918413 493.32334676 160.74678126 493.36073422 C175.62929078 493.39883277 190.51172656 493.41818044 205.39428592 493.41848236 C213.74699383 493.41906656 222.09952438 493.42753464 230.45218658 493.45648003 C237.56460842 493.48101459 244.67678819 493.48826284 251.78924093 493.4732325 C255.41592587 493.46607211 259.042133 493.46688261 262.66876411 493.4896431 C266.60631147 493.51411742 270.54318047 493.4995728 274.48077393 493.48143005 C275.61872823 493.49463002 276.75668253 493.50782999 277.9291203 493.52142996 C285.26528554 493.4443371 290.98188146 492.11459852 297.07006836 487.86669922 C301.48076353 483.23584339 303.19559592 478.83645051 303.19311619 472.51561451 C303.19510724 471.39843818 303.19709828 470.28126184 303.19914967 469.13023168 C303.19478041 467.28152071 303.19478041 467.28152071 303.19032288 465.39546204 C303.1911773 464.09024556 303.19203173 462.78502908 303.19291204 461.44026059 C303.1951539 457.80992557 303.19113992 454.17961991 303.18613398 450.54928863 C303.18182526 446.63723937 303.18327621 442.72519183 303.18403625 438.81314087 C303.18456122 432.03275979 303.18141726 425.25238832 303.17579842 418.47200966 C303.16767973 408.66865743 303.16506782 398.86530986 303.16381042 389.06195464 C303.16162049 373.15759278 303.15496197 357.25323603 303.14550781 341.34887695 C303.13633219 325.8970543 303.12925209 310.44523303 303.125 294.9934082 C303.12473728 294.04134478 303.12447455 293.08928137 303.12420387 292.10836754 C303.12289885 287.33226072 303.12163514 282.55615389 303.12039196 277.78004706 C303.11002116 238.14226086 303.09240442 198.50448038 303.07006836 158.86669922 C302.40469213 158.86431087 301.73931589 158.86192251 301.05377674 158.85946178 C284.86222125 158.80032068 268.6708338 158.72477643 252.47944355 158.63098431 C244.64939533 158.58602246 236.81939263 158.54660873 228.98925781 158.52026367 C222.1643508 158.49728669 215.3395878 158.46389214 208.51479501 158.41799766 C204.90123781 158.39406123 201.28782328 158.37533527 197.67418861 158.36908531 C193.63968202 158.36191221 189.60567187 158.33148119 185.57128906 158.29907227 C184.37366943 158.30050735 183.1760498 158.30194244 181.94213867 158.30342102 C180.84142532 158.29088287 179.74071198 158.27834473 178.60664368 158.26542664 C177.65258794 158.26081767 176.6985322 158.25620871 175.71556568 158.25146008 C172.55296612 157.79149192 170.65897809 156.70929243 168.07006836 154.86669922 C165.91721305 151.79311392 165.81299715 149.14573715 165.79159546 145.45037842 C165.78043198 144.35103973 165.76926849 143.25170105 165.75776672 142.11904907 C165.75560654 140.91783417 165.75344635 139.71661926 165.7512207 138.47900391 C165.73615227 136.57618149 165.73615227 136.57618149 165.72077942 134.63491821 C165.69348497 131.16007211 165.67833172 127.68526655 165.66535139 124.21034145 C165.64971839 120.57745657 165.62292871 116.94465441 165.59732056 113.31182861 C165.55053574 106.4342121 165.51379022 99.55658001 165.48064768 92.6788857 C165.44242418 84.8481774 165.39301463 77.01755221 165.34266353 69.18691397 C165.2393481 53.0802354 165.15008646 36.97351073 165.07006836 20.86669922 C141.86955459 20.79659197 118.66905832 20.74370259 95.46846008 20.7112627 C84.6958156 20.69579939 73.92323698 20.67472004 63.15063477 20.64038086 C53.76031449 20.61046219 44.37004191 20.59112032 34.97967529 20.58443373 C30.00838313 20.58052568 25.03722741 20.57135222 20.065979 20.54950905 C15.38419805 20.52910497 10.70260939 20.52287336 6.02078819 20.52737617 C4.30515179 20.52655273 2.58950877 20.52061048 0.8739109 20.50908279 C-1.47508075 20.494077 -3.82335373 20.49777461 -6.17236328 20.50593567 C-7.48499649 20.50317029 -8.7976297 20.50040491 -10.15003967 20.49755573 C-16.28769187 21.09695761 -21.7598749 22.77287442 -25.80493164 27.67919922 Z M186.07006836 29.86669922 C186.07006836 65.50669922 186.07006836 101.14669922 186.07006836 137.86669922 C220.39006836 137.86669922 254.71006836 137.86669922 290.07006836 137.86669922 C286.19270104 132.69687613 282.96847966 128.52364671 278.48022461 124.11669922 C277.97261093 123.61428711 277.46499725 123.111875 276.94200134 122.59423828 C275.34365329 121.01343661 273.73870573 119.43958272 272.13256836 117.86669922 C270.01581802 115.78685961 267.9024001 113.70371498 265.79272461 111.61669922 C265.02957443 110.86193298 265.02957443 110.86193298 264.25100708 110.09191895 C260.93698048 106.79129018 257.83061621 103.37715617 254.79833984 99.81982422 C251.25355015 95.81384632 247.38082669 92.117256 243.57006836 88.36669922 C238.4804591 83.35749453 233.54002235 78.32647141 228.88842773 72.90771484 C225.30164148 68.88173028 221.41154013 65.14748424 217.57006836 61.36669922 C212.44019792 56.31786939 207.4481832 51.24831733 202.75854492 45.78662109 C199.87631979 42.50931941 196.78992416 39.4417585 193.69506836 36.36669922 C193.06729492 35.73505859 192.43952148 35.10341797 191.79272461 34.45263672 C191.19588867 33.85708984 190.59905273 33.26154297 189.98413086 32.64794922 C189.44739746 32.11234375 188.91066406 31.57673828 188.35766602 31.02490234 C187.23479912 29.75523885 187.23479912 29.75523885 186.07006836 29.86669922 Z M-137.21152687 202.09277248 C-139.27732375 205.42747528 -139.42820986 207.34665799 -139.42440796 211.24952698 C-139.43279694 212.53798523 -139.44118591 213.82644348 -139.4498291 215.15394592 C-139.43886326 216.57455748 -139.42749733 217.995166 -139.41577148 219.41577148 C-139.41791824 220.91739228 -139.42179725 222.41901145 -139.42727661 223.92062378 C-139.43696139 227.99294452 -139.42167828 232.06482613 -139.40137053 236.13709378 C-139.38379034 240.39932831 -139.38732478 244.66154947 -139.38809204 248.92381287 C-139.38621969 256.08022399 -139.36886377 263.23646538 -139.34155273 270.39282227 C-139.31009062 278.66748879 -139.299557 286.94196953 -139.30102384 295.21669155 C-139.30224441 303.17716587 -139.2920342 311.13757968 -139.27544022 319.09803581 C-139.2683782 322.48590505 -139.26471425 325.87375287 -139.2636528 329.2616291 C-139.26164409 333.24992677 -139.24943591 337.23806838 -139.22932053 341.22631454 C-139.22347804 342.69044349 -139.22101828 344.1545904 -139.2221756 345.61873055 C-139.22315699 347.61612229 -139.2106092 349.61350708 -139.19735718 351.6108551 C-139.19400549 352.72894845 -139.1906538 353.8470418 -139.18720055 354.99901676 C-138.92094141 357.96691001 -138.7211993 359.4975148 -136.92993164 361.86669922 C-131.61974542 365.6133859 -126.31465039 365.2885434 -120.07446289 365.24765015 C-118.43153511 365.2546701 -118.43153511 365.2546701 -116.75541687 365.26183188 C-113.08429873 365.27380046 -109.41355258 365.26431704 -105.74243164 365.25488281 C-103.11091901 365.25894767 -100.47940808 365.26428906 -97.84790039 365.27081299 C-91.44178254 365.28414777 -85.03577018 365.28127375 -78.62964821 365.27257507 C-73.4229305 365.26579792 -68.21624234 365.26488193 -63.00952148 365.26814651 C-62.26826995 365.26860621 -61.52701841 365.26906591 -60.76330471 365.26953954 C-59.25743229 365.27049873 -57.75155988 365.27147137 -56.24568748 365.27245732 C-42.127516 365.28101046 -28.00940297 365.27117827 -13.89124107 365.25505622 C-1.77910866 365.24165309 10.3329375 365.24398121 22.44506836 365.2578125 C36.51296916 365.27386965 50.58081873 365.2801865 64.64872742 365.27097571 C66.14903767 365.27002007 67.64934793 365.26907696 69.1496582 365.26814651 C70.25690923 365.26745228 70.25690923 365.26745228 71.38652897 365.26674401 C76.58655592 365.26415453 81.78655035 365.26852422 86.98657227 365.27558517 C93.98630734 365.28488104 100.98587671 365.27825582 107.9855957 365.2609024 C110.55671925 365.25693083 113.12785649 365.25808301 115.69897461 365.2646904 C119.20436918 365.27286914 122.70923864 365.26262797 126.21459961 365.24765015 C127.74640617 365.25768839 127.74640617 365.25768839 129.30915833 365.26792943 C134.62555408 365.22376759 138.52164597 364.94838899 143.07006836 361.86669922 C147.29174773 355.47650581 146.4934685 348.097815 146.45825195 340.68896484 C146.46232148 339.25102847 146.4676655 337.81309522 146.47418213 336.37516785 C146.48781635 332.48466203 146.4825733 328.59439585 146.47304487 324.70388603 C146.46542802 320.62456511 146.4724995 316.54526415 146.47720337 312.46594238 C146.48265503 305.61658053 146.47548481 298.76731584 146.46118164 291.91796875 C146.44485623 284.00910037 146.45014515 276.10046404 146.46666086 268.19160128 C146.48029255 261.39053762 146.48218717 254.58954365 146.47434485 247.78847075 C146.46967757 243.73115964 146.46901739 239.67395747 146.47895432 235.61665344 C146.48764627 231.80146278 146.4815617 227.98657012 146.46427155 224.17141151 C146.46031855 222.77465115 146.46142036 221.37786552 146.46805954 219.98111534 C146.76288244 209.9089817 146.76288244 209.9089817 143.07006836 200.86669922 C137.12916146 197.52672196 131.87779018 197.44351265 125.1635437 197.49247742 C124.07486563 197.48850301 122.98618756 197.4845286 121.86451924 197.48043376 C118.22180193 197.47082036 114.57947391 197.48262344 110.93676758 197.49438477 C108.32318985 197.49195653 105.70961305 197.48823689 103.09603882 197.48332214 C96.73784519 197.47384655 90.37976526 197.48042273 84.02158009 197.49258509 C76.61624017 197.50622179 69.21092717 197.5045658 61.80557789 197.50245176 C48.59342509 197.49926379 35.38132625 197.51091936 22.16918945 197.53051758 C9.34951128 197.54952863 -3.47010367 197.55660287 -16.28979492 197.55102539 C-30.25367846 197.54496807 -44.21753421 197.54514322 -58.18141544 197.55651122 C-59.67017738 197.55771851 -61.15893932 197.55892449 -62.64770126 197.56012917 C-63.74642855 197.56103447 -63.74642855 197.56103447 -64.86735234 197.56195807 C-70.029279 197.56583738 -75.1911953 197.56544358 -80.35312271 197.56354332 C-87.29866974 197.56120013 -94.24413401 197.5697475 -101.18966293 197.58560371 C-103.74185601 197.58985365 -106.29405734 197.59069237 -108.84625244 197.58791351 C-112.32338293 197.58470136 -115.80026893 197.59374936 -119.27737427 197.60600281 C-120.29302747 197.60222348 -121.30868067 197.59844416 -122.35511124 197.59455031 C-128.43852337 197.63260954 -132.66851929 197.66031769 -137.21152687 202.09277248 Z "
        fill={color}
        transform="translate(173.929931640625,-0.86669921875)"
        shapeRendering='auto'
      />
      <path
        d="M0 0 C6.88875 -0.061875 13.7775 -0.12375 20.875 -0.1875 C23.0288623 -0.21481201 25.18272461 -0.24212402 27.40185547 -0.27026367 C29.14029381 -0.27903887 30.87873839 -0.28668035 32.6171875 -0.29296875 C33.4944751 -0.30831665 34.3717627 -0.32366455 35.27563477 -0.33947754 C46.11444661 -0.34398495 54.03509178 2.68929369 62 10 C70.47662331 18.47662331 72.01236006 31.73798726 72.0703125 43.18359375 C71.83339205 55.75322267 69.35246489 67.88894944 60.25390625 77.16015625 C54.22299596 82.08313501 47.31589737 85.13596522 39.50683594 85.11352539 C38.61399902 85.11340454 37.72116211 85.11328369 36.80126953 85.11315918 C35.40690674 85.10548523 35.40690674 85.10548523 33.984375 85.09765625 C33.12344238 85.09664917 32.26250977 85.09564209 31.37548828 85.09460449 C28.16697859 85.08938212 24.95848792 85.07542085 21.75 85.0625 C14.5725 85.041875 7.395 85.02125 0 85 C0 56.95 0 28.9 0 0 Z M18 15 C18 33.15 18 51.3 18 70 C34.67301308 71.50936589 34.67301308 71.50936589 48.25 64.9375 C54.31880609 54.75057549 54.31881435 42.30137407 52.49609375 30.828125 C51.08039343 25.48891236 49.17658638 21.64340514 45 18 C36.54793823 13.54530612 27.40580416 15 18 15 Z "
        fill={color}
        transform="translate(151,240)"
        shapeRendering='auto'
      />
      <path
        d="M0 0 C7.095 -0.04125 14.19 -0.0825 21.5 -0.125 C23.72427734 -0.14320801 25.94855469 -0.16141602 28.24023438 -0.18017578 C30.02473714 -0.18602298 31.80924259 -0.191118 33.59375 -0.1953125 C34.50286133 -0.20554443 35.41197266 -0.21577637 36.34863281 -0.22631836 C44.54685276 -0.2285389 51.38837102 0.71069682 58 6 C63.51525475 11.51525475 66.09355577 17.65905967 66.3125 25.5 C65.93335565 34.22032004 64.11890241 40.55981871 58 47 C51.92143918 51.91458109 45.48968711 53.1806612 37.8125 53.625 C36.62269531 53.69976562 35.43289062 53.77453125 34.20703125 53.8515625 C28.80782062 54.0420639 23.40257033 54 18 54 C18 64.23 18 74.46 18 85 C12.06 85 6.12 85 0 85 C0 56.95 0 28.9 0 0 Z M18 15 C18 22.59 18 30.18 18 38 C22.4859375 38.0928125 22.4859375 38.0928125 27.0625 38.1875 C27.99070557 38.21481201 28.91891113 38.24212402 29.87524414 38.27026367 C35.37101845 38.32487496 39.14944809 37.63369811 44 35 C46.54971309 32.03904287 46.96968874 30.34554834 47.3125 26.4375 C46.96453603 22.38466618 46.96453603 22.38466618 45 19 C39.14456603 14.48295094 32.17149178 14.87458857 25.0625 14.9375 C21.5665625 14.9684375 21.5665625 14.9684375 18 15 Z "
        fill={color}
        transform="translate(72,240)"
        shapeRendering='auto'
      />
      <path
        d="M0 0 C19.47 0 38.94 0 59 0 C59 4.95 59 9.9 59 15 C45.47 15 31.94 15 18 15 C18 21.27 18 27.54 18 34 C29.88 34 41.76 34 54 34 C54 38.95 54 43.9 54 49 C42.12 49 30.24 49 18 49 C18 60.88 18 72.76 18 85 C12.06 85 6.12 85 0 85 C0 56.95 0 28.9 0 0 Z "
        fill={color}
        transform="translate(236,240)"
        shapeRendering='auto'
      />
    </svg>
  );
};