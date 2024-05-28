import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export default ({ width = '100%', height = '100%', className }: Props) => {
    return (
       <svg fill="#620986"  width={width} height={height} viewBox="736.5 467.6 448.6 343.3">
       <g>
       <g id="change1_8">
       <path d="M776.8484,690.088L776.8484,690.088Q811.8544,677.06116,849.68616,673.7336L849.6009,673.74274Q871.5183,670.93463,980.6589,668.67346C980.7388,668.6718,980.8187,668.67456,980.8983,668.68176L980.8983,668.68176Q1080.1392,677.6594,1089.3002,680.78644L1088.9716,680.7024Q1119.0769,685.92706,1148.228,703.7865L1147.83,703.5955Q1175.4943,713.5381,1166.3641,738.9422L1166.364,738.94226Q1165.4982,741.3512,1164.2904,743.8947C1164.2233,744.036,1164.1412,744.1695,1164.0453,744.2931L1164.0453,744.2931Q1149.1603,763.46405,1102.6605,779.18896L1102.6825,779.1814Q1079.1141,787.4346,1042.7249,789.24133L1042.7637,789.2391Q1014.3018,791.1665,899.4713,790.5772C899.4188,790.57697,899.36646,790.57477,899.31415,790.5707L899.31415,790.5707Q806.0695,783.2876,755.14044,751.1572L755.2572,751.2259Q736.49036,740.9704,737.921,723.02844L737.91425,723.20917Q737.8713,712.83295,758.8713,701.5707L758.88696,701.5624Q819.012,669.9517,904.0202,670.11365L904.03467,670.1138Q957.8305,670.5758,1076.3654,685.8665L1076.4417,685.87775Q1121.1406,693.27454,1139.9973,703.3183L1139.7838,703.2191Q1177.103,718.1435,1168.9911,738.4279L1168.9911,738.4279Q1163.6118,751.8793,1137.113,767.0277L1137.1449,767.0091Q1063.3698,810.8724,971.6794,806.461L971.5633,806.4523Q817.6854,790.70996,767.15607,765.47577L767.12994,765.4625Q744.55133,753.8011,738.0566,721.63055L738.3631,722.38086Q737.52094,721.0857,737.9292,719.49915L737.92926,719.499Q738.7546,716.2924,746.4622,711.28033L746.4622,711.28033Q757.06305,704.38684,781.97,692.67267L782.0052,692.6565Q818.98566,676.06805,877.68134,671.93835L877.6899,671.93774Q926.371,668.70667,1033.2909,673.48914L1033.3728,673.4943Q1094.8573,678.58777,1135.3585,690.41095L1135.4427,690.43744Q1177.5826,704.63104,1179.3245,713.5962L1179.3024,713.4954Q1185.0709,737.10767,1160.4653,757.35236L1160.6014,757.2303Q1140.5082,776.8369,1093.081,786.3459L1093.0372,786.3542Q1072.4733,790.03723,1047.5934,791.3676L1047.5629,791.369L918.1747,796.4535L918.2796,796.44684Q903.0201,797.7921,817.051,784.0323C815.87256,783.8436,815.07007,782.73535,815.2587,781.5569C815.4474,780.3784,816.55566,779.5759,817.73413,779.7646L817.73413,779.7646Q903.17426,793.4398,917.9001,792.14154L918.005,792.1349L1047.3932,787.0504L1047.3627,787.0518Q1071.975,785.7357,1092.2753,782.0999L1092.2314,782.1082Q1138.4049,772.8506,1157.5831,754.1369C1157.6267,754.0944,1157.6722,754.05347,1157.7192,754.01483L1157.7192,754.01483Q1180.2279,735.49536,1175.1039,714.5212L1175.0818,714.4204Q1173.8197,707.92413,1134.0631,694.53326L1134.1473,694.55975Q1094.0656,682.859,1033.0159,677.8016L1033.0978,677.80676Q926.4181,673.03503,877.97614,676.25024L877.9847,676.24963Q820.0544,680.3255,783.7741,696.59985L783.8093,696.5837Q759.1707,708.17163,748.8183,714.9036L748.8183,714.9036Q742.5208,718.9987,742.1148,720.5763L742.11487,720.5762Q742.1801,720.32263,741.9865,720.0249C742.1351,720.2534,742.2391,720.50793,742.293,720.7752L742.293,720.7752Q748.3774,750.9128,769.1132,761.62244L769.0871,761.6092Q818.9103,786.4907,972.0031,802.1527L971.887,802.144Q1062.2787,806.49286,1134.9362,763.2941L1134.968,763.2755Q1160.1584,748.875,1164.9781,736.82306L1164.9781,736.82306Q1171.4854,720.5516,1138.1791,707.23206C1138.1061,707.2029,1138.0349,707.1698,1137.9656,707.1329L1137.9656,707.1329Q1119.7354,697.4227,1075.7361,690.1418L1075.8124,690.153Q957.53375,674.8954,903.99756,674.43555L904.012,674.43567Q820.0749,674.2758,760.8982,705.3878L760.9139,705.3795Q742.2039,715.41364,742.23615,723.1912C742.2364,723.2514,742.23413,723.31195,742.2294,723.37195L742.2294,723.37195Q741.02136,738.5213,757.3297,747.4333C757.3695,747.455,757.40814,747.4778,757.4465,747.50195L757.4465,747.50195Q807.4715,779.062,899.6507,786.26184L899.4935,786.2553Q1014.16595,786.84375,1042.4717,784.92694L1042.5105,784.9247Q1078.2755,783.1489,1101.254,775.1023L1101.276,775.0947Q1146.5438,759.78644,1160.6315,741.64246L1160.3864,742.04083Q1161.5028,739.6897,1162.2969,737.48035L1162.2968,737.4804Q1169.9652,716.14355,1146.3683,707.6628C1146.2294,707.61285,1146.0961,707.5489,1145.9702,707.4718L1145.9702,707.4718Q1117.5237,690.0441,1088.2325,684.9607C1088.121,684.94135,1088.0111,684.9132,1087.9039,684.87665L1087.9039,684.87665Q1079.2339,681.91724,980.5089,672.9862L980.74835,672.9945Q871.8391,675.2509,850.1501,678.0297L850.0648,678.0389Q812.8146,681.3153,778.3557,694.13855C777.2372,694.5548,775.99304,693.9855,775.5768,692.86694C775.1605,691.7484,775.72986,690.5043,776.8484,690.088 Z"/></g><g id="change1_16"><path d="M768.2626,693.7739L768.2626,693.7739Q764.819,648.07294,777.3218,622.22833L777.2286,622.4523Q789.39856,587.85846,813.2902,582.7431L813.34467,582.7322Q840.8792,577.5722,858.24854,597.7478L858.20514,597.699Q870.6983,611.3532,870.35333,668.25287C870.34607,669.44635,869.37274,670.40796,868.17926,670.4007C866.9858,670.39343,866.0242,669.4201,866.03143,668.2266L866.03143,668.2266Q866.36615,613.0208,855.01654,600.61646L854.97314,600.5676Q839.2282,582.2789,814.1407,586.9802L814.1951,586.9693Q792.67175,591.5776,781.3056,623.8866C781.27875,623.9629,781.2476,624.0377,781.2124,624.11053L781.2124,624.11053Q769.2162,648.908,772.5724,693.4492C772.66205,694.63934,771.76996,695.6768,770.57983,695.7665C769.3897,695.85614,768.35223,694.96405,768.2626,693.7739 Z"/></g><g id="change1_6"><path d="M800.4325,642.5651L800.4325,642.5651Q801.6319,675.6862,792.8374,684.9394L792.93695,684.827Q785.4984,693.8308,775.75946,695.63086L775.72815,695.6364Q769.0067,696.77673,765.5139,685.878C765.49744,685.82666,765.48303,685.7752,765.47046,685.7228L765.47046,685.7228Q758.05383,654.8166,783.9688,603.79626C784.00507,603.72485,784.04535,603.65546,784.0893,603.5885L784.0893,603.5885Q792.2658,591.14044,807.12994,585.8747L807.0629,585.89966Q823.28186,579.54236,835.7261,583.7515L835.6769,583.73553Q854.54065,589.61633,865.26373,613.7394C865.2814,613.779,865.2978,613.81915,865.313,613.8598L865.313,613.8598Q873.03625,634.4991,870.06464,664.62085C869.94745,665.8086,868.88965,666.67645,867.7019,666.55927C866.51416,666.4421,865.6463,665.3843,865.7635,664.19653L865.7635,664.19653Q868.6366,635.07367,861.26514,615.3746L861.3144,615.495Q851.3861,593.16003,834.3905,587.86163L834.3413,587.84564Q823.391,584.1417,808.6402,589.9236L808.5732,589.94855Q795.0799,594.7287,787.7017,605.9613L787.8222,605.75354Q762.6278,655.3553,769.6731,684.71423L769.62964,684.559Q771.97864,691.8888,775.00525,691.3753L774.97394,691.38086Q783.1676,689.86646,789.60504,682.07434C789.6369,682.03577,789.6701,681.9982,789.7046,681.962L789.7046,681.962Q797.247,674.0262,796.1134,642.7215C796.0702,641.5288,797.0021,640.527,798.19476,640.48376C799.38745,640.44055,800.3893,641.37244,800.4325,642.5651 Z"/></g><g id="change1_19"><path d="M821.66644,583.03735L821.66644,583.03735Q806.62213,585.71985,797.7574,561.75336C797.7144,561.63715,797.68146,561.5174,797.659,561.39557L797.659,561.39557Q793.3496,538.0264,803.3689,524.19055L803.4076,524.13873Q815.14246,508.9148,838.86334,506.95233C838.9213,506.94754,838.97943,506.94507,839.03766,506.94498L839.03766,506.94498Q856.3775,506.91434,866.1563,521.78973C866.17957,521.82513,866.20166,521.86096,866.22284,521.89764L866.22284,521.89764Q878.55493,543.29297,869.9514,562.4307C869.9199,562.5008,869.8848,562.5689,869.84607,562.63525L869.84607,562.63525Q860.3709,578.8441,835.2926,585.3996C835.19916,585.424,835.104,585.44214,835.0081,585.45386L835.0081,585.45386Q810.70245,588.42316,799.3151,574.6523L799.3789,574.72595Q791.2808,565.78625,790.0466,559.1249L790.0451,559.117Q787.33685,544.1899,790.5282,536.8322L790.5661,536.7497Q799.9036,517.4822,818.57275,505.6718C818.6363,505.63162,818.70166,505.59485,818.76904,505.5615L818.76904,505.5615Q832.86646,498.58057,850.43787,503.4802L850.4798,503.49234Q867.7672,508.69135,876.8085,523.83203L876.86005,523.9233Q884.4051,538.07495,877.3158,551.71094L877.3563,551.6287Q869.6595,568.10474,849.20667,576.43445L849.4069,576.3407Q836.2082,583.3657,812.00244,580.5632C810.8169,580.4259,809.96704,579.3535,810.1043,578.16797C810.2416,576.9824,811.31396,576.13257,812.4995,576.26984L812.4995,576.26984Q835.367,578.9175,847.3763,572.5255C847.44147,572.4908,847.5081,572.4596,847.57654,572.43176L847.57654,572.43176Q866.46063,564.74097,873.44055,549.7995L873.4811,549.7173Q879.5207,538.10034,873.0462,525.9566L873.0978,526.04785Q864.9164,512.3472,849.23505,507.6312L849.277,507.64334Q833.30054,503.18848,820.687,509.4346L820.8833,509.32428Q803.25555,520.4758,794.4554,538.6346L794.4933,538.55206Q791.8233,544.7076,794.29767,558.3454L794.2962,558.3375Q795.30707,563.79333,802.58203,571.82434L802.6458,571.898Q812.52606,583.8464,834.4841,581.1638L834.1996,581.2181Q857.5441,575.11584,866.11487,560.4541L866.0095,560.6586Q873.7068,543.5366,862.47833,524.05597L862.54486,524.1639Q854.04926,511.24045,839.04535,511.26694L839.21967,511.25958Q817.4005,513.0647,806.8307,526.7773L806.8694,526.72546Q797.93555,539.06244,801.90936,560.61176L801.811,560.25397Q809.4218,580.83044,820.9078,578.7825C822.0827,578.573,823.2051,579.35565,823.41455,580.5306C823.624,581.7055,822.8414,582.8279,821.66644,583.03735 Z"/></g><g id="change1_17"><path d="M848.1936,588.902L848.1936,588.902Q863.80804,576.3299,871.5741,572.9225L871.49225,572.96045Q887.91095,564.92303,893.78516,567.1599L893.56213,567.08856Q900.1447,568.8076,898.33606,575.73346L898.33606,575.7335Q897.6353,578.41675,895.46295,581.94324C895.4286,581.99896,895.39166,582.0532,895.3524,582.1056L895.3524,582.1056Q891.3406,587.45984,886.67035,592.13135L886.6592,592.1424Q875.43414,603.2085,866.49097,611.30084L866.5793,611.21625Q866.5135,611.2829,866.48895,611.3125L866.4888,611.31274Q867.55676,610.02625,866.2091,608.6966L866.2085,608.69604Q865.4043,607.9032,864.40894,608.1347L863.52844,608.56824Q878.00616,596.7003,886.391,586.60736L886.3392,586.67224Q890.8876,580.7483,893.70514,574.7825L893.7218,574.748Q894.5444,573.0834,894.4942,572.5153L894.4942,572.5153Q894.5296,572.9162,894.9786,573.139C894.90405,573.102,894.83167,573.0608,894.7619,573.01544L894.7619,573.01544Q891.9241,571.1723,888.6423,571.33813L888.6662,571.3368Q882.1133,571.7408,874.7222,574.02374L874.8453,573.9816Q852.81244,582.2695,843.8066,590.56726C842.9289,591.376,841.56177,591.32,840.75305,590.4423C839.94434,589.56464,840.0003,588.1975,840.878,587.3888L840.878,587.3888Q850.503,578.52057,873.32367,569.93634C873.36414,569.92114,873.4054,569.907,873.4467,569.8942L873.4467,569.8942Q881.33105,567.4589,888.4002,567.0231L888.42413,567.0217Q893.10425,566.7852,897.116,569.3908L896.89935,569.2673Q898.62164,570.12177,898.7994,572.1353L898.7994,572.1353Q898.9561,573.91113,897.59656,576.66266L897.6132,576.6282Q894.5978,583.01294,889.7673,589.3043L889.71545,589.3692Q881.0661,599.78064,866.26843,611.91077C866.0121,612.1209,865.7108,612.2692,865.38794,612.3443L865.38794,612.3443Q864.06506,612.652,863.1742,611.7737L863.1736,611.77313Q861.698,610.31726,863.1633,608.5521L863.16315,608.55237Q863.3066,608.3796,863.50275,608.1807L863.59106,608.0961Q872.4672,600.06445,883.625,589.06464L883.61383,589.0757Q888.06665,584.6217,891.8937,579.51404L891.78314,579.6764Q893.61664,576.69995,894.1543,574.64136L894.1543,574.6414Q894.8709,571.89734,892.4701,571.2703C892.3946,571.2506,892.32,571.22675,892.2471,571.199L892.2471,571.199Q888.12616,569.6297,873.3925,576.8423L873.31067,576.88025Q866.07086,580.0568,850.90405,592.26843C849.9744,593.0169,848.6141,592.87006,847.8656,591.9404C847.1171,591.0108,847.264,589.65045,848.1936,588.902 Z"/></g><g id="change1_1"><path d="M884.73737,596.653L884.73737,596.653Q894.421,602.38434,914.7786,610.0224C915.22974,610.19165,915.6113,610.5068,915.8628,610.9177L915.8632,610.9184Q915.9271,611.02295,915.98724,611.1366L915.9872,611.13654Q917.20734,613.44366,917.9408,624.3813L917.9398,624.36707Q918.3891,630.46423,918.3788,650.64124L918.36975,650.4433Q919.4487,662.2376,919.5065,666.6033C919.5222,667.79663,918.5676,668.77686,917.37427,668.7926C916.1809,668.80835,915.2007,667.85376,915.18494,666.6604L915.18494,666.6604Q915.1294,662.46356,914.0658,650.837C914.05975,650.77124,914.0567,650.705,914.05676,650.63904L914.05676,650.63904Q914.06696,630.6217,913.6295,624.6847L913.62854,624.6705Q912.9566,614.6508,912.1666,613.15704L912.16656,613.157Q912.16956,613.1626,912.17584,613.1729L913.26044,614.0689Q892.54675,606.2973,882.5361,600.3724C881.509,599.76447,881.1691,598.43915,881.77704,597.41205C882.38495,596.38495,883.71027,596.0451,884.73737,596.653 Z"/></g><g id="change1_13"><path d="M921.4707,663.7886L921.4707,663.7886L919.8501,651.45264C919.84045,651.379,919.8346,651.30493,919.8325,651.2307L919.8326,651.23376L919.83234,651.22534L919.8323,651.2223Q919.0989,624.63477,918.5776,619.6059L918.5736,619.5635Q918.003,612.7529,917.45795,611.6094L917.4581,611.60974Q917.4969,611.69104,917.5923,611.80493C917.47046,611.6595,917.3684,611.49866,917.2886,611.32654L917.2886,611.32654Q916.72314,610.1071,913.83734,608.745L913.9789,608.8057Q900.3007,603.5047,887.6273,597.7291C886.54126,597.2342,886.0621,595.95264,886.557,594.8666C887.05194,593.7805,888.3335,593.30133,889.41956,593.79626L889.41956,593.79626Q901.97955,599.5202,915.54065,604.7758C915.58856,604.7944,915.63574,604.81464,915.6822,604.83655L915.6822,604.83655Q919.98486,606.8675,921.2095,609.5084L920.90576,609.03Q921.1622,609.3362,921.35925,609.7495L921.35944,609.7499Q922.24396,611.6057,922.8805,619.20264L922.8765,619.1602Q923.4147,624.35144,924.1526,651.10315L924.1525,651.1001L924.1528,651.1085L924.13525,650.88965L925.75586,663.2256C925.9113,664.4089,925.07806,665.4942,923.8948,665.64966C922.7115,665.8051,921.62616,664.97186,921.4707,663.7886 Z"/></g><g id="change1_15"><path d="M896.30444,568.7671L896.2266,568.77673L896.2275,568.7766L896.30536,568.76697Q900.2818,568.3456,909.8452,567.8695L909.7376,567.87756L909.73883,567.87744L909.7804,567.8737Q912.1093,567.68616,915.28467,567.18726L915.2742,567.1889Q917.66394,566.80133,920.66174,566.14044L920.5969,566.15576Q934.6586,562.5984,937.7672,562.0464L937.69525,562.0604Q940.77594,561.4049,947.0713,560.647L947.09894,560.64386Q960.35583,559.22076,970.15564,559.74567L970.21625,559.74976Q986.84216,561.1101,998.00037,564.695L997.94556,564.6782Q1010.4145,568.32245,1016.0833,570.33185C1016.1251,570.3467,1016.1663,570.36273,1016.20715,570.38007L1016.20715,570.38007Q1030.5968,576.50085,1038.385,578.92126L1038.3643,578.9149Q1041.7517,579.93054,1051.1783,579.4022C1052.37,579.3354,1053.3901,580.24725,1053.4569,581.43884C1053.5237,582.63043,1052.6119,583.6506,1051.4203,583.7174L1051.4203,583.7174Q1041.2366,584.2882,1037.123,583.0548L1037.1023,583.04846Q1029.1053,580.5631,1014.5155,574.35724L1014.63934,574.40546Q1009.0855,572.4368,996.73315,568.82666L996.67834,568.8099Q985.9938,565.3772,969.86383,564.0574L969.92444,564.06146Q960.4713,563.5551,947.56024,564.9411L947.5879,564.938Q941.4848,565.6727,938.5948,566.2877L938.5228,566.30176Q935.56793,566.8264,921.657,570.3457L921.59216,570.361Q918.47473,571.0483,915.96606,571.45514L915.95557,571.4568Q912.61884,571.9811,910.1273,572.1817L910.1689,572.178L910.16766,572.1781L910.06006,572.18616Q900.6159,572.65625,896.7608,573.0648L896.8387,573.0552L896.8378,573.0553C895.5732,573.19073,894.5091,572.3306,894.3833,571.1438C894.2575,569.957,895.1176,568.8929,896.30444,568.7671 Z"/></g><g id="change1_3"><path d="M1023.1045,611.07697L1023.1045,611.07697Q1027.5687,610.4047,1034.014,607.7394L1034.057,607.7221Q1040.8768,605.07153,1048.9702,600.5267C1049.9062,600.001,1051.0864,600.24225,1051.7411,601.09314C1052.3958,601.94403,1052.3264,603.1465,1051.5784,603.91656L1051.5784,603.91656Q1049.1508,606.41565,1032.8843,614.9493C1031.8274,615.5037,1030.5212,615.09644,1029.9668,614.03955C1029.4124,612.98267,1029.8196,611.67645,1030.8765,611.122L1030.8765,611.122Q1046.5319,602.90906,1048.4783,600.9052L1051.0864,604.2951Q1042.7267,608.9895,1035.6227,611.75055L1035.6656,611.7333Q1028.733,614.60016,1023.74805,615.35077C1022.5679,615.5285,1021.4671,614.7158,1021.28937,613.53564C1021.11163,612.35547,1021.9243,611.2547,1023.1045,611.07697 Z"/></g><g id="change1_14"><path d="M882.50885,594.3319L882.50885,594.3319Q902.5549,597.6378,904.31635,598.1752L904.3162,598.1752Q906.276,598.7729,905.96173,600.6636L905.9626,600.65857Q905.7384,602.0271,904.3927,602.4025L904.384,598.2371Q908.27325,599.3046,910.8955,603.64075L910.8854,603.6242Q914.6583,609.73834,917.2194,619.7388L917.2109,619.7065Q919.47327,628.00507,923.54724,652.0982L923.5294,652.00525Q924.99493,658.83716,926.7784,663.29584C927.2216,664.40393,926.6826,665.66156,925.5745,666.1048C924.46643,666.54803,923.2088,666.00903,922.76556,664.90094L922.76556,664.90094Q920.8459,660.1018,919.3036,652.91174L919.28577,652.8188Q915.24744,628.93634,913.0411,620.8433L913.03253,620.81104Q910.63464,611.4477,907.2074,605.89386L907.19727,605.8773Q905.467,603.0162,903.24005,602.40497C902.30316,602.1478,901.653,601.29706,901.651,600.32556C901.649,599.35406,902.29553,598.5006,903.2313,598.23956L903.2313,598.23956Q901.9193,598.6056,901.69745,599.95996L901.6983,599.95496Q901.39136,601.8016,903.05536,602.3091L903.05524,602.3091Q901.5684,601.85547,881.8056,598.5963C880.62805,598.4021,879.8308,597.29004,880.025,596.1125C880.21924,594.93494,881.3313,594.1377,882.50885,594.3319 Z"/></g><g id="change1_7"><path d="M897.25574,573.39453L897.25574,573.39453Q904.51965,569.06683,924.27545,565.59576L924.3776,565.5803L957.6877,561.3574L957.71173,561.3545Q973.22107,559.5648,981.2053,559.6776L981.1789,559.67737Q986.87115,559.6882,991.636,560.3584L991.6158,560.35565Q994.9676,560.795,1008.32086,563.6076L1008.3494,563.61383L1036.497,569.94147L1036.5078,569.9439Q1042.0007,571.20874,1050.1292,574.5474C1051.2332,575.00085,1051.7606,576.2634,1051.3071,577.36743C1050.8536,578.47144,1049.5911,578.9988,1048.487,578.54535L1048.487,578.54535Q1040.6858,575.34106,1035.5381,574.1557L1035.549,574.15814L1007.40155,567.8305L1007.4301,567.83673Q994.2404,565.05853,991.05414,564.6409L991.03394,564.6382Q986.56537,564.0096,981.1707,563.9994L981.1443,563.99915Q973.4391,563.89026,958.2072,565.64795L958.23126,565.645L924.9212,569.8679L925.0234,569.8525Q906.0497,573.1861,899.4679,577.1074C898.44257,577.71826,897.1162,577.3824,896.5054,576.35706C895.89453,575.3317,896.2304,574.0054,897.25574,573.39453 Z"/></g><g id="change1_10"><path d="M1054.9077,604.3948L1054.9077,604.3948Q1053.5505,605.3888,1051.8364,606.52356L1051.8296,606.5281L1041.6646,613.20215C1040.6669,613.8572,1039.3271,613.57947,1038.6721,612.5818C1038.0171,611.5841,1038.2948,610.2444,1039.2925,609.58936L1039.2925,609.58936L1049.4575,602.9153L1049.4507,602.9198Q1051.0784,601.84216,1052.354,600.90796C1053.3169,600.20276,1054.6691,600.4116,1055.3743,601.3745C1056.0795,602.3374,1055.8706,603.6896,1054.9077,604.3948 Z"/></g><g id="change1_5"><path d="M1028.3511,614.16486L1028.3511,614.16486Q1031.5457,619.21356,1033.5583,634.8784L1033.5585,634.8788Q1034.3091,640.7282,1034.542,644.6896L1030.315,644.19543Q1030.9271,642.15497,1032.9736,642.7306L1033.0024,642.7389Q1034.4028,643.1538,1034.5538,644.6833L1034.5538,644.6827Q1034.6584,645.7394,1034.9757,658.0949L1034.9742,658.05304Q1035.2467,664.0949,1035.496,667.9889C1035.5723,669.17993,1034.6685,670.20734,1033.4774,670.28357C1032.2864,670.3598,1031.259,669.45605,1031.1827,668.265L1031.1827,668.265Q1030.931,664.3328,1030.6566,658.24774L1030.6552,658.2059Q1030.342,646.0093,1030.2528,645.1086L1030.2528,645.108Q1030.3875,646.4718,1031.7747,646.8828L1031.8035,646.8911Q1033.8461,647.46564,1034.4546,645.4374C1034.1666,646.42926,1033.1886,647.0814,1032.1433,646.96387C1031.098,646.8463,1030.2893,645.9932,1030.2275,644.94324L1030.2275,644.94324Q1030.0034,641.13214,1029.2716,635.42883L1029.2717,635.4292Q1027.3811,620.71515,1024.6987,616.47577C1024.0605,615.4672,1024.3608,614.1323,1025.3694,613.4942C1026.3779,612.8561,1027.7129,613.1563,1028.3511,614.16486 Z"/></g><g id="change1_2"><path d="M1034.5226,613.948L1034.5226,613.948Q1036.2261,621.29205,1037.373,639.43494L1037.373,639.4368Q1037.9391,648.5171,1038.2657,658.3698L1038.2668,658.4173Q1038.3192,663.1128,1038.3009,663.6433L1038.3009,663.64496Q1038.2269,665.7379,1036.1857,665.7843L1036.1366,665.7849Q1034.185,665.7849,1033.9832,663.82526L1038.2938,663.59595Q1038.297,664.4723,1037.9882,669.61444C1037.9166,670.8058,1036.8927,671.71356,1035.7014,671.64197C1034.5101,671.5704,1033.6024,670.54663,1033.674,669.3553L1033.674,669.3553Q1033.9745,664.35144,1033.9718,663.6116C1033.9677,662.45966,1034.8678,661.507,1036.0181,661.4458C1037.1683,661.3846,1038.1644,662.2364,1038.2825,663.38226L1038.2825,663.38226Q1038.0847,661.4629,1036.1366,661.4629L1036.0875,661.4635Q1034.0516,661.50977,1033.9816,663.49225L1033.9816,663.4939Q1033.9965,663.06494,1033.9451,658.4655L1033.9462,658.513Q1033.6215,648.7197,1033.0596,639.70575L1033.0596,639.70764Q1031.935,621.92035,1030.3124,614.92456C1030.0427,613.76196,1030.7666,612.6008,1031.9292,612.3312C1033.0918,612.0615,1034.2529,612.7854,1034.5226,613.948 Z"/></g><g id="change1_4"><path d="M963.64545,551.19415L963.64545,551.19415Q953.6941,555.6447,929.8393,540.39215L929.73785,540.3232Q912.5127,527.8776,910.8886,513.37976C910.86926,513.20703,910.8708,513.03265,910.8932,512.8603L910.8932,512.8603Q915.49866,477.46704,960.7918,468.90155C960.93976,468.87357,961.0902,468.86115,961.2407,468.86444L961.2407,468.86444Q988.84155,469.46957,1004.88605,487.22473C1004.9489,487.2943,1005.0072,487.3679,1005.0605,487.44504L1005.0605,487.44504Q1017.9566,506.10657,1009.1007,530.7149L1009.06506,530.8072Q1004.62836,541.56287,996.0903,548.55005C996.05676,548.57745,996.0226,548.6038,995.9875,548.62915L995.9875,548.62915Q979.26575,560.71387,969.6697,562.2972L969.5864,562.30927Q944.2607,565.48145,928.831,547.0814L928.8669,547.1231Q910.3489,526.1486,919.05457,503.31604L919.073,503.26932Q922.9897,493.6732,933.6598,486.344L933.6321,486.36334Q951.9223,473.3741,962.2156,471.3165L962.2718,471.30603Q983.7451,467.60165,1005.90466,488.81976C1005.98883,488.90036,1006.0663,488.98758,1006.1364,489.08066L1006.1364,489.08066Q1020.69543,508.41415,1013.6746,528.85077L1013.64655,528.92773Q1008.80585,541.45166,1002.65674,546.9939C1002.59033,547.0537,1002.5202,547.10944,1002.44696,547.1606L1002.44696,547.1606Q990.33453,555.61664,975.73816,559.7979L975.7445,559.7961Q956.00226,565.5164,932.17786,552.71484C931.1265,552.14996,930.73224,550.8398,931.2971,549.78845C931.862,548.7371,933.1722,548.34283,934.2235,548.9077L934.2235,548.9077Q956.49384,560.8742,974.5416,555.64484L974.548,555.643Q988.4516,551.6602,999.97296,543.61676L999.7632,543.78345Q1005.1463,538.93164,1009.6152,527.3696L1009.5871,527.4466Q1015.8622,509.18057,1002.6839,491.68057L1002.91565,491.94147Q982.33105,472.23135,963.00653,475.56506L963.06274,475.5546Q953.6734,477.43155,936.1345,489.88715L936.1068,489.9065Q926.5025,496.50357,923.07446,504.90256L923.0929,504.85583Q915.3181,525.2469,932.10675,544.26263L932.14264,544.3043Q946.05963,560.9004,969.0493,558.0208L968.96606,558.0329Q977.5585,556.61523,993.4559,545.1262L993.3531,545.2053Q1001.0484,538.90784,1005.0697,529.1591L1005.03406,529.2514Q1013.13715,506.73474,1001.50494,489.90213L1001.6794,490.12244Q986.88403,473.74966,961.146,473.18536L961.5949,473.14825Q919.38025,481.1316,915.1791,513.418L915.18365,512.89856Q916.5947,525.49493,932.269,536.8199L932.16754,536.7509Q954.05786,550.7474,961.8809,547.2487C962.9704,546.7615,964.24866,547.2497,964.7359,548.3392C965.22314,549.42865,964.7349,550.7069,963.64545,551.19415 Z"/></g><g id="change1_9"><path d="M1070.4238,613.34033L1070.4238,613.34033Q1052.7661,605.9429,1044.2543,586.49945C1044.1604,586.2851,1044.1019,586.0569,1044.0813,585.8238L1044.0813,585.8238Q1043.5865,580.24725,1052.0487,577.34186C1052.0901,577.32764,1052.1322,577.31464,1052.1743,577.303L1052.1743,577.303Q1061.1117,574.8307,1068.8456,576.416L1068.25,576.37805Q1073.9791,575.94824,1092.6212,592.18134C1093.5199,592.96387,1093.6156,594.32623,1092.835,595.2266C1092.0543,596.127,1090.6921,596.2255,1089.79,595.44684L1089.79,595.44684Q1078.7587,585.92444,1068.8191,582.16034L1068.7156,582.11804Q1059.7255,578.17035,1054.5906,581.7488L1054.8956,581.4912Q1051.2427,585.205,1054.5371,592.5806L1054.5065,592.5151Q1057.3997,598.4509,1070.34,609.21515C1071.2574,609.9784,1071.3826,611.3409,1070.6194,612.2584C1069.8562,613.17596,1068.4935,613.301,1067.576,612.5378L1067.576,612.5378Q1053.9216,601.17944,1050.6215,594.40875L1050.5908,594.3432Q1046.0942,584.27594,1051.8143,578.46045C1051.9078,578.3654,1052.01,578.2791,1052.1194,578.2029L1052.1194,578.2029Q1059.2433,573.23834,1070.4534,578.16077L1070.3499,578.11847Q1081.004,582.1532,1092.6143,592.17523L1089.7831,595.44073Q1072.5023,580.39307,1068.5732,580.68787C1068.3739,580.7028,1068.1735,580.69006,1067.9777,580.6499L1067.9777,580.6499Q1061.2623,579.2733,1053.3267,581.4685L1053.4523,581.4296Q1048.1908,583.23615,1048.3865,585.44183L1048.2135,584.7662Q1056.0317,602.625,1072.0938,609.354C1073.1946,609.8152,1073.7131,611.0814,1073.252,612.1822C1072.7908,613.28296,1071.5247,613.8015,1070.4238,613.34033 Z"/></g><g id="change1_12"><path d="M1066.9417,676.2725L1066.9417,676.2725Q1064.7018,662.4632,1081.3784,616.8127L1081.371,616.83356Q1088.1581,597.64685,1098.7592,591.90704L1098.8131,591.8788Q1124.8021,578.74066,1140.221,609.2414L1140.221,609.24133Q1141.7052,612.1773,1143.0878,615.5262L1143.1295,615.63556Q1150.2325,635.8858,1151.9882,656.5443L1151.9786,656.4545Q1154.4552,675.9164,1149.3132,689.2576C1149.2415,689.444,1149.1443,689.6193,1149.0243,689.77893L1149.0243,689.77893Q1142.7584,698.1147,1137.7026,694.3145L1137.7026,694.3145Q1136.6836,693.5486,1135.8333,692.2672C1135.7892,692.20087,1135.749,692.1322,1135.7125,692.0614L1135.7125,692.0614Q1130.7355,682.39404,1123.4907,672.6617C1123.453,672.6109,1123.4177,672.559,1123.3845,672.5051L1123.5366,672.7213L1123.5361,672.7207L1123.3839,672.5044Q1122.0477,670.33606,1121.0476,667.9579L1121.0427,667.9464Q1118.5322,661.8797,1118.1536,649.86005C1118.116,648.6672,1119.0525,647.6697,1120.2454,647.6321C1121.4382,647.5945,1122.4358,648.53107,1122.4734,649.72394L1122.4734,649.72394Q1122.8271,660.95526,1125.0364,666.2938L1125.0315,666.28235Q1125.9022,668.35266,1127.0634,670.23706L1126.9111,670.02075L1126.9116,670.02136L1126.9575,670.081Q1134.4149,680.0991,1139.555,690.0831L1139.4343,689.8773Q1139.874,690.5398,1140.2996,690.8597L1140.2996,690.8597Q1141.9005,692.06305,1145.5695,687.182L1145.2805,687.7033Q1150.0302,675.38,1147.6913,657.00006L1147.6818,656.9103Q1145.9725,636.79877,1139.0511,617.0661L1139.0929,617.1755Q1137.774,613.9809,1136.3638,611.1913L1136.3638,611.1912Q1122.8949,584.5478,1100.7631,595.73596L1100.817,595.7077Q1091.6779,600.6559,1085.4454,618.27484L1085.438,618.2957Q1069.1488,662.8859,1071.2078,675.5805C1071.3988,676.7586,1070.5988,677.8685,1069.4207,678.05963C1068.2426,678.25073,1067.1327,677.4506,1066.9417,676.2725 Z"/></g><g id="change1_18"><path d="M1124.8945,642.4702L1124.8945,642.4702Q1125.4965,659.92145,1133.3364,676.1045L1133.1752,675.8264Q1142.2576,689.10175,1145.0951,687.5331L1144.5885,687.9208Q1148.6113,683.7678,1149.5134,674.97046L1149.5024,675.1545Q1150.3187,626.78894,1148.9064,623.0493L1148.9064,623.0494Q1149.2817,624.04333,1150.5856,624.0653L1150.5851,624.06525Q1150.8813,624.0703,1151.1654,623.9902C1150.5676,624.1588,1149.9263,624.0622,1149.4048,623.7248C1148.8833,623.3874,1148.5322,622.8419,1148.441,622.22754L1148.441,622.22754Q1144.3959,594.963,1128.2471,590.52844L1128.496,590.58124Q1105.7062,587.1321,1088.7489,611.62366L1088.8093,611.5313Q1070.9149,640.42615,1073.792,675.61273C1073.8893,676.80225,1073.0038,677.8454,1071.8142,677.9426C1070.6246,678.03986,1069.5817,677.1544,1069.4844,675.9649L1069.4844,675.9649Q1066.4913,639.3605,1085.135,609.2558L1085.1954,609.16345Q1103.6874,582.4553,1129.1427,586.3079C1129.2266,586.3206,1129.3098,586.33826,1129.3916,586.3607L1129.3916,586.3607Q1148.2574,591.5414,1152.7162,621.59326L1149.9918,619.8306Q1150.3196,619.73816,1150.6588,619.74396L1150.6583,619.7439Q1152.2883,619.77136,1152.9496,621.5223L1152.9496,621.52234Q1154.6539,626.03516,1153.8237,675.22736C1153.8226,675.289,1153.8191,675.35004,1153.8127,675.4114L1153.8127,675.4114Q1152.7578,685.699,1147.6927,690.92786C1147.544,691.0814,1147.3733,691.2121,1147.1862,691.31555L1147.1862,691.31555Q1140.9094,694.78546,1129.608,678.26685C1129.5475,678.17834,1129.4935,678.08527,1129.4468,677.9888L1129.4468,677.9888Q1121.2086,660.9838,1120.5752,642.61914C1120.534,641.4264,1121.4677,640.4261,1122.6604,640.38495C1123.8531,640.3438,1124.8534,641.27747,1124.8945,642.4702 Z"/></g><g id="change1_20"><path d="M1072.0615,607.9091L1072.0615,607.9091Q1076.7288,610.64624,1078.099,611.40594C1079.1428,611.9846,1079.5198,613.29987,1078.9412,614.3436C1078.3625,615.3874,1077.0474,615.7645,1076.0035,615.18585L1076.0035,615.18585Q1074.5818,614.3977,1069.875,611.63727C1068.8455,611.0335,1068.5005,609.7095,1069.1042,608.68C1069.708,607.6505,1071.032,607.30536,1072.0615,607.9091 Z"/></g><g id="change1_21"><path d="M1098.8529,593.53284L1098.8529,593.53284Q1071.3004,571.02185,1070.9374,542.7245L1070.9381,542.6324Q1071.2759,531.2973,1079.9408,521.50586L1080.0193,521.42175Q1091.5026,509.76044,1102.5156,507.92102L1102.5544,507.91492Q1140.8488,502.2325,1147.538,546.8343L1147.5314,546.79315Q1150.4343,563.8949,1141.3187,575.38165C1141.2621,575.453,1141.2009,575.5208,1141.1357,575.5845L1141.1357,575.5845Q1131.9967,584.50824,1111.3121,591.63824C1110.1838,592.02716,1108.9539,591.4278,1108.565,590.29944C1108.176,589.1711,1108.7754,587.9411,1109.9037,587.5522L1109.9037,587.5522Q1129.6713,580.73834,1138.1162,572.4922L1137.9332,572.695Q1145.8508,562.7179,1143.2704,547.5164L1143.2638,547.4753Q1137.2147,507.14102,1103.1887,512.19006L1103.2275,512.18396Q1093.598,513.7923,1083.0989,524.4542L1083.1774,524.3701Q1075.5493,532.9898,1075.2582,542.76117L1075.2589,542.66907Q1075.5961,568.9503,1101.5875,590.1859C1102.5117,590.94104,1102.6488,592.30237,1101.8937,593.2266C1101.1385,594.1509,1099.7771,594.28796,1098.8529,593.53284 Z"/></g><g id="change1_11"><path d="M1105.2457,583.5539L1105.2457,583.5538Q1105.0378,582.82904,1104.5055,582.6661L1104.5054,582.666Q1106.2682,583.2055,1115.7261,580.4942L1115.7261,580.4942Q1116.2659,580.3394,1116.8214,580.1762L1116.7736,580.19086Q1125.9564,577.25964,1133.7394,572.0896L1133.7188,572.1035Q1145.7572,563.9055,1147.2709,552.64905L1147.2544,552.8279Q1148.2081,533.96814,1135.3917,518.9037L1135.4066,518.9211Q1130.3843,513.1428,1128.3083,512.66315L1128.2517,512.64923Q1121.4055,510.87137,1112.5363,511.23703L1112.5737,511.23517Q1096.8527,512.1567,1089.2307,521.30756C1089.2019,521.34216,1089.1726,521.37524,1089.1417,521.408L1089.1417,521.408Q1076.5493,534.7464,1078.2333,546.90546L1078.2363,546.9276Q1080.2594,562.7395,1095.646,574.4883L1095.6761,574.5118Q1103.2859,580.5385,1104.9802,580.8709L1104.98,580.87085Q1104.9528,580.8655,1104.9026,580.8632C1105.1361,580.87384,1105.3665,580.92236,1105.5845,581.0068L1105.5845,581.0068Q1108.3466,582.0762,1119.2285,580.8767C1120.4148,580.7459,1121.4825,581.60156,1121.6133,582.78784C1121.744,583.9741,1120.8884,585.0418,1119.7021,585.1726L1119.7021,585.1726Q1107.7706,586.4878,1104.0239,585.0372L1104.7058,585.1807Q1104.4359,585.16846,1104.1484,585.11206L1104.1482,585.112Q1101.4248,584.5777,1092.9928,577.89984L1093.023,577.92334Q1076.2015,565.07886,1073.9492,547.4762L1073.9523,547.49835Q1071.9839,533.2863,1085.9989,518.4411L1085.9099,518.54156Q1094.7303,507.95172,1112.3208,506.9206L1112.3583,506.91873Q1121.8699,506.52658,1129.3381,508.466L1129.2815,508.45212Q1132.7251,509.2478,1138.6686,516.08575L1138.6835,516.10315Q1152.6112,532.47375,1151.5708,553.04614C1151.5677,553.1059,1151.5623,553.16565,1151.5543,553.225L1151.5543,553.225Q1149.7838,566.39233,1136.1514,575.6758L1136.1307,575.6897Q1127.8453,581.1935,1118.0878,584.30817L1118.0399,584.3228Q1117.4639,584.4921,1116.917,584.64886L1116.917,584.64886Q1106.2281,587.7131,1103.2407,586.7988L1103.2406,586.79877Q1101.53,586.2752,1101.0912,584.74506C1100.7623,583.59766,1101.4258,582.401,1102.573,582.0721C1103.7202,581.74316,1104.9169,582.4066,1105.2457,583.5539 Z"/>
       </g>
       </g>
       </svg>
    );
};