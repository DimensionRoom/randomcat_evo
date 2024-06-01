import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export default ({ width = '100%', height = '100%', className }: Props) => {
    return (
        <svg viewBox="0 0 864 863.999991" width={width} height={height} className={className}><path fill="#000000" d="M 638.691406 828.527344 C 632.246094 827.972656 622.148438 826.109375 612.765625 823.742188 C 580.433594 815.582031 559.40625 804.285156 531.0625 779.847656 C 516.597656 767.375 505.328125 755.023438 494.941406 740.242188 L 489.132812 731.984375 L 487.71875 735.476562 C 485.566406 740.769531 483.945312 743.222656 481.527344 744.847656 C 478.695312 746.757812 473.898438 746.828125 470.34375 745.019531 C 461.640625 740.582031 443.589844 707.695312 436.273438 682.964844 L 434.894531 678.308594 L 424.882812 677.90625 C 419.378906 677.691406 412.113281 677.046875 408.742188 676.484375 C 401.507812 675.277344 380.015625 670.554688 377.644531 669.652344 C 375.535156 668.855469 373.191406 665.894531 373.191406 664.042969 C 373.191406 663.203125 372.351562 661.992188 371.152344 661.113281 C 370.039062 660.289062 368.519531 658.234375 367.792969 656.558594 C 367.058594 654.882812 364.15625 650.261719 361.351562 646.289062 C 358.539062 642.316406 354.359375 635.96875 352.054688 632.1875 C 349.75 628.40625 347.082031 624.128906 346.128906 622.691406 C 343.957031 619.402344 343.410156 617.199219 344.226562 615.054688 C 344.820312 613.496094 344.261719 612.738281 336.554688 604.554688 C 331.976562 599.699219 326.179688 593.429688 323.667969 590.609375 C 321.15625 587.792969 318.984375 585.828125 318.84375 586.238281 C 318.710938 586.648438 319.214844 591.476562 319.976562 596.960938 C 321.351562 606.925781 326.675781 646.394531 329.242188 665.652344 C 329.988281 671.242188 331.5 680.371094 332.605469 685.929688 C 333.789062 691.898438 334.464844 696.960938 334.242188 698.292969 C 333.230469 704.542969 326.703125 708.105469 321.347656 705.335938 C 318.78125 704.011719 317.425781 702.082031 309.175781 687.953125 C 305.277344 681.277344 299.175781 670.851562 295.617188 664.78125 C 281.917969 641.421875 273.121094 623.796875 258.871094 591.203125 C 254.929688 582.183594 247.1875 566.097656 241.671875 555.449219 C 221.464844 516.472656 199.738281 469.925781 192.382812 449.839844 C 187.210938 435.726562 175.546875 399.964844 174.273438 394.324219 C 171.5 382.011719 172.363281 367.648438 176.359375 359.820312 C 178.292969 356.035156 184.769531 349.429688 189.699219 346.222656 L 193.761719 343.578125 L 191.570312 332.59375 C 188.875 319.082031 185.902344 298.601562 184.367188 282.898438 C 182.722656 266.121094 182.710938 219.632812 184.351562 203.199219 C 187.859375 167.992188 194.492188 136.25 204.847656 105.136719 C 213.582031 78.902344 230.964844 40.371094 235.53125 37.121094 C 238.542969 34.976562 242.429688 34.832031 245.265625 36.765625 C 246.941406 37.90625 249.59375 38.699219 254.457031 39.484375 C 301.125 47.089844 349.503906 71.925781 393.214844 110.730469 C 403.058594 119.460938 423.222656 140.050781 431.917969 150.253906 C 439.960938 159.683594 450.289062 172.789062 455.664062 180.382812 C 457.628906 183.171875 459.488281 185.597656 459.792969 185.789062 C 460.097656 185.976562 462.222656 185.277344 464.519531 184.242188 C 473.324219 180.269531 479.367188 178.726562 486.457031 178.664062 C 492.804688 178.609375 493.234375 178.695312 498 181.046875 C 501.839844 182.945312 504.105469 184.707031 508.144531 188.921875 C 522.308594 203.703125 542.929688 238.683594 554.855469 268.144531 C 556.683594 272.652344 560.710938 283.792969 563.804688 292.898438 C 569.582031 309.882812 579 334.617188 598.355469 383.589844 C 604.414062 398.921875 610.992188 415.597656 612.972656 420.648438 C 614.953125 425.699219 620.847656 439.722656 626.078125 451.808594 C 636.960938 476.976562 639.109375 483.089844 639.179688 489.195312 C 639.265625 495.933594 637.007812 500.152344 632.128906 502.390625 C 624.148438 506.054688 610.136719 500.789062 586.84375 485.363281 C 580.34375 481.0625 572.234375 475.457031 568.816406 472.90625 C 565.398438 470.363281 562.546875 468.332031 562.484375 468.40625 C 562.421875 468.480469 562.621094 471.335938 562.929688 474.765625 C 563.238281 478.191406 563.792969 486.046875 564.171875 492.21875 L 564.851562 503.433594 L 567.007812 505.71875 C 568.191406 506.980469 570.757812 511.519531 572.703125 515.816406 C 574.648438 520.117188 578.367188 527.320312 580.964844 531.832031 C 590.019531 547.554688 589.976562 547.398438 588.664062 557.414062 C 587.300781 567.789062 583.160156 578.855469 575.976562 591.328125 C 573.835938 595.039062 572.082031 598.222656 572.082031 598.398438 C 572.082031 598.570312 573.207031 599.285156 574.582031 599.984375 C 585.390625 605.5 610.992188 630.773438 620.152344 644.980469 C 633.820312 666.179688 631.890625 678.664062 614.566406 681.097656 L 611.429688 681.539062 L 613.84375 685.890625 C 624.394531 704.964844 627.128906 710.9375 635.753906 733.859375 C 638.949219 742.339844 643.832031 755.03125 646.617188 762.070312 C 659.277344 794.054688 664.246094 814.601562 661.105469 821.945312 C 660.015625 824.496094 657.097656 827.328125 654.585938 828.28125 C 652.851562 828.921875 644.785156 829.046875 638.691406 828.527344 Z M 643.886719 809.457031 C 641.195312 797.640625 637.542969 786.609375 630.058594 767.652344 C 627.347656 760.789062 622.816406 748.976562 619.980469 741.402344 C 612.277344 720.800781 609.574219 714.726562 601.507812 699.863281 C 587.050781 673.234375 587.28125 673.84375 589.804688 668.90625 C 591.886719 664.828125 594.847656 663.675781 603.222656 663.675781 C 608.585938 663.675781 610.140625 663.472656 610.140625 662.792969 C 610.140625 661.007812 602.835938 650.351562 597.128906 643.828125 C 589.4375 635.023438 576.109375 622.0625 570.804688 618.214844 C 568.480469 616.535156 565.3125 614.671875 563.761719 614.082031 L 560.9375 613.003906 L 548.289062 625.007812 C 541.332031 631.609375 535.363281 637.253906 535.027344 637.542969 C 534.660156 637.863281 534.960938 638.675781 535.769531 639.5625 C 536.519531 640.378906 537.621094 642.019531 538.21875 643.207031 C 538.820312 644.394531 540.59375 647.347656 542.152344 649.765625 C 546.296875 656.199219 548.378906 660.597656 554.015625 674.839844 C 562.957031 697.460938 567.933594 706.875 578.273438 720.742188 C 581.367188 724.890625 584.214844 729.441406 584.601562 730.84375 C 585.980469 735.878906 582.359375 741.320312 577.066406 742.179688 C 574.648438 742.574219 562.367188 738.816406 552.976562 734.808594 C 539.605469 729.113281 520.855469 714.414062 512.070312 702.746094 C 503.730469 691.675781 494.296875 673.914062 492.96875 666.796875 C 492.714844 665.445312 492.277344 664.335938 491.992188 664.335938 C 491.707031 664.335938 488.339844 665.796875 484.503906 667.589844 C 472.664062 673.113281 460.792969 676.742188 454.460938 676.78125 C 453.125 676.789062 451.871094 677.066406 451.660156 677.402344 C 451.128906 678.253906 456.382812 691.566406 460.480469 699.753906 C 464.308594 707.398438 472.898438 722.058594 473.546875 722.058594 C 473.773438 722.058594 474.921875 720 476.085938 717.492188 C 479.285156 710.636719 483.539062 708.0625 489.746094 709.226562 C 493.5 709.933594 498.394531 715.097656 507.824219 728.324219 C 520.296875 745.820312 530.03125 756.316406 546.472656 770.015625 C 561.109375 782.210938 572.765625 790.03125 585.007812 795.890625 C 600.265625 803.183594 627.710938 810.558594 641.824219 811.15625 C 644.167969 811.253906 644.277344 811.195312 643.886719 809.457031 Z M 550.976562 710.734375 C 548.242188 705.769531 541.945312 691.984375 539.070312 684.664062 C 538.148438 682.320312 536.199219 677.371094 534.742188 673.667969 C 532.160156 667.140625 529.164062 661.507812 524.078125 653.632812 C 522.722656 651.539062 521.519531 649.539062 521.40625 649.1875 C 521.109375 648.292969 506.734375 656.96875 506.886719 657.957031 C 507.304688 660.703125 509.320312 666.519531 511.117188 670.175781 C 514.011719 676.054688 523.960938 690.695312 528.402344 695.609375 C 533.0625 700.773438 551.269531 715.378906 553.15625 715.472656 C 553.390625 715.484375 552.429688 713.382812 550.976562 710.734375 Z M 449.960938 659.648438 C 462.21875 658.519531 469.792969 655.753906 494.621094 643.347656 C 511.988281 634.671875 519.460938 628.953125 539.542969 609 C 553.28125 595.355469 557.058594 590.390625 563.789062 577.132812 C 567.511719 569.8125 568.5625 566.984375 571.046875 557.679688 L 572.589844 551.925781 L 565.503906 538.007812 L 558.417969 524.09375 L 552.9375 533.296875 C 549.648438 538.824219 545.59375 544.574219 542.769531 547.703125 C 537.257812 553.816406 521.082031 569.210938 514.972656 574.152344 C 508.191406 579.648438 494.5 587.9375 483.46875 593.234375 C 477.875 595.917969 472.410156 598.589844 471.328125 599.164062 C 457.605469 606.425781 450.996094 609.667969 444.183594 612.457031 C 434.265625 616.511719 433.710938 616.664062 419.636719 619.15625 C 406.082031 621.554688 386.40625 622.359375 372.730469 621.074219 C 368.214844 620.648438 364.390625 620.445312 364.214844 620.617188 C 363.789062 621.042969 368.207031 627.503906 375.714844 637.4375 C 382.425781 646.308594 384.324219 649.726562 384.351562 652.972656 C 384.355469 654.386719 384.734375 655.167969 385.507812 655.402344 C 389.214844 656.496094 410.386719 659.910156 416.050781 660.320312 C 424.097656 660.90625 439.585938 660.601562 449.960938 659.648438 Z M 307.539062 635.46875 C 302.003906 594.675781 300.929688 585.929688 300.542969 578.761719 C 300.183594 572.085938 300.28125 571.042969 301.472656 568.757812 L 302.804688 566.207031 L 295.292969 556.453125 C 263.1875 514.75 237.898438 470.792969 218.476562 422.9375 C 213.121094 409.738281 203.324219 380.816406 199.871094 367.992188 L 197.695312 359.949219 L 195.117188 362.417969 C 190.988281 366.371094 189.792969 369.695312 189.859375 377.027344 C 189.921875 384.058594 190.722656 389.03125 193.105469 397.257812 C 195.746094 406.351562 208.300781 442.871094 211.867188 451.808594 C 219.472656 470.878906 236.285156 506.476562 255.710938 544.628906 C 262.878906 558.699219 271.878906 577.441406 275.714844 586.28125 C 285.710938 609.296875 308.84375 655.410156 309.875 654.371094 C 309.976562 654.25 308.933594 645.792969 307.539062 635.46875 Z M 396.824219 604.613281 C 406.121094 603.789062 426.617188 600.386719 430.789062 598.972656 C 437.523438 596.683594 449.066406 591.433594 457.023438 587.035156 C 461.644531 584.484375 468.472656 581.042969 472.199219 579.390625 C 479.96875 575.953125 486.703125 572.230469 495.804688 566.34375 C 503.449219 561.398438 505.53125 559.636719 519.757812 546.085938 C 531.296875 535.09375 536.027344 529.035156 541.402344 518.378906 C 542.679688 515.855469 544.484375 513.074219 545.421875 512.199219 C 547.039062 510.695312 547.128906 510.246094 547.125 504.328125 C 547.121094 497.601562 546.253906 483.550781 545.132812 471.8125 C 531.132812 325.707031 462.011719 186.554688 365.515625 110.207031 C 334.289062 85.5 300.15625 68.097656 266.863281 59.910156 C 258.167969 57.773438 244.628906 55.25 244.285156 55.699219 C 243.230469 57.082031 233.167969 79.515625 229.617188 88.402344 C 191.816406 182.9375 190.371094 288.386719 225.449219 391.5 C 250.484375 465.078125 294.902344 536.703125 351.625 594.945312 L 360.394531 603.953125 L 367.941406 604.523438 C 378.769531 605.355469 388.167969 605.378906 396.824219 604.613281 Z M 432.488281 523.914062 C 421.757812 522.054688 412.148438 514.820312 407.09375 504.804688 C 403 496.695312 401.875 488.410156 403.695312 479.816406 C 406.691406 465.683594 417.636719 455.183594 431.613281 453.027344 C 443.691406 451.164062 456.632812 457.144531 463.96875 467.980469 C 473.640625 482.28125 472.574219 501.359375 461.421875 513.394531 C 459.445312 515.53125 456.359375 518.21875 454.5625 519.371094 C 448.585938 523.214844 439.445312 525.101562 432.488281 523.914062 Z M 444.171875 505.070312 C 450.238281 501.929688 453.746094 495.125 453.085938 487.804688 C 451.730469 472.707031 435.738281 464.792969 425.8125 474.300781 C 422.363281 477.609375 420.929688 480.988281 420.59375 486.664062 C 420.328125 491.078125 420.5 492.136719 422.046875 495.519531 C 426.585938 505.433594 435.734375 509.40625 444.171875 505.070312 Z M 619.730469 481.53125 C 619.226562 480.09375 614.609375 469.199219 609.472656 457.324219 C 604.34375 445.449219 596.371094 426.140625 591.761719 414.414062 C 587.148438 402.691406 581.269531 387.84375 578.699219 381.421875 C 576.125 375 571.980469 364.371094 569.484375 357.808594 C 566.992188 351.242188 562.441406 339.496094 559.367188 331.707031 C 556.289062 323.917969 551.230469 310.046875 548.113281 300.875 C 545 291.707031 540.945312 280.375 539.109375 275.679688 C 535.082031 265.414062 522.332031 239.996094 515.738281 229.105469 C 506.246094 213.4375 495.519531 199.28125 491.074219 196.566406 C 487.949219 194.664062 482.570312 194.9375 475.210938 197.375 L 469.019531 199.429688 L 470.453125 201.804688 C 471.246094 203.113281 472.671875 205.363281 473.632812 206.808594 C 474.59375 208.246094 478.183594 214.152344 481.605469 219.925781 C 518.714844 282.445312 544.558594 353.84375 556.933594 428.019531 C 558 434.425781 559.199219 442.179688 559.601562 445.246094 C 560.792969 454.433594 560.429688 453.785156 563.761719 452.585938 C 566.398438 451.640625 566.859375 451.644531 569.515625 452.675781 C 571.101562 453.289062 576.234375 456.644531 580.929688 460.128906 C 592.058594 468.398438 606.269531 477.566406 614.027344 481.476562 C 617.425781 483.191406 620.3125 484.5 620.433594 484.375 C 620.558594 484.25 620.25 483.007812 619.730469 481.53125 Z M 377.789062 435.015625 C 363.523438 431.234375 353.523438 418.988281 352.421875 403.972656 C 351.648438 393.359375 355.386719 383.648438 363.328125 375.65625 C 370.59375 368.347656 377.855469 365.230469 387.628906 365.230469 C 396.925781 365.230469 404.664062 368.566406 411.238281 375.410156 C 421.722656 386.320312 423.839844 401.988281 416.761719 416.332031 C 409.679688 430.695312 392.511719 438.917969 377.789062 435.015625 Z M 392.582031 416.796875 C 396.742188 414.859375 401.011719 410.078125 402.449219 405.75 C 404.035156 400.976562 403.472656 394.476562 401.136719 390.492188 C 392.390625 375.582031 370.082031 383.363281 369.941406 401.378906 C 369.882812 408.398438 372.988281 413.875 378.625 416.679688 C 383.054688 418.882812 388.011719 418.925781 392.582031 416.796875 Z M 307.34375 348.40625 C 291.589844 345.03125 277.363281 336.007812 267.84375 323.355469 C 257.371094 309.421875 252.816406 295.730469 252.773438 277.980469 C 252.746094 267.625 253.484375 262.636719 256.421875 253.382812 C 264.492188 227.960938 285.339844 208.464844 310.050781 203.230469 C 318.308594 201.480469 324.164062 201.09375 330.863281 201.851562 C 346.203125 203.597656 358.476562 209.265625 369.554688 219.722656 C 384.488281 233.820312 392.222656 252.15625 392.222656 273.464844 C 392.226562 309.789062 367.753906 341.304688 334.148438 348.238281 C 326.953125 349.71875 313.972656 349.808594 307.34375 348.40625 Z M 333.699219 330.4375 C 359.84375 323.1875 377.890625 295.257812 374.574219 267.171875 C 371.886719 244.40625 358.191406 227.160156 337.75 220.8125 C 330.652344 218.609375 317.929688 218.609375 310.84375 220.8125 C 292.355469 226.558594 278.183594 241.230469 272.40625 260.625 C 270.046875 268.527344 269.464844 281.109375 271.085938 289.09375 C 273.484375 300.914062 278.109375 309.652344 286.199219 317.65625 C 293.859375 325.238281 301.976562 329.621094 311.820312 331.503906 C 317.765625 332.644531 327.445312 332.171875 333.699219 330.4375 Z M 333.699219 330.4375 " fill-opacity="1" fill-rule="evenodd"/></svg>
    );
};