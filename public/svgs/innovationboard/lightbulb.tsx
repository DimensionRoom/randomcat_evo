import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export default ({ width = '100%', height = '100%', className }: Props) => {
    return (
        <svg viewBox="0 0 864 863.999991" width={width} height={height} className={className}>
            <path fill="#000000" d="M 509.285156 334.082031 C 457.207031 312.136719 392.507812 306.386719 343.480469 339.132812 C 322.839844 352.890625 306.382812 372.046875 297.5 395.300781 C 286.875 423.167969 290.621094 454.515625 297.410156 482.90625 C 303.683594 509.117188 313.957031 535.503906 330.328125 557.097656 C 336.773438 565.546875 344.960938 574.691406 354.363281 581.832031 C 357.5 585.3125 361.070312 588.535156 364.292969 591.234375 C 364.292969 591.324219 364.203125 591.410156 364.203125 591.410156 C 360.113281 601.25 362.550781 615.007812 363.855469 625.285156 C 365.335938 636.519531 368.035156 647.402344 373.085938 657.59375 C 377.789062 667.085938 384.496094 674.660156 392.417969 680.410156 C 392.070312 681.28125 391.898438 682.148438 391.984375 683.109375 C 394.074219 700.699219 400.777344 719.246094 416.019531 729.699219 C 422.375 734.050781 429.429688 736.316406 436.832031 737.1875 C 439.703125 748.421875 450.417969 755.648438 461.824219 756.953125 C 475.320312 758.523438 487.425781 749.03125 493.433594 737.621094 C 493.785156 736.925781 494.132812 736.230469 494.480469 735.53125 C 494.652344 735.269531 494.742188 734.921875 494.914062 734.660156 C 495.175781 733.964844 495.523438 733.269531 495.785156 732.570312 C 495.875 732.398438 495.960938 732.308594 495.960938 732.222656 C 496.394531 731.351562 496.746094 730.394531 497.09375 729.523438 C 497.355469 728.828125 497.613281 728.042969 497.789062 727.257812 C 497.789062 727.171875 497.875 726.996094 497.875 726.910156 C 506.324219 723.425781 513.988281 718.550781 519.472656 711.234375 C 524.523438 704.53125 527.484375 696.082031 527.136719 687.636719 C 526.875 682.585938 525.132812 677.621094 521.824219 674.574219 C 524.175781 672.746094 526.351562 670.742188 528.355469 668.476562 C 536.890625 658.8125 540.722656 646.445312 542.898438 633.992188 C 544.8125 623.019531 545.683594 611.351562 542.722656 600.464844 C 541.417969 595.503906 539.066406 590.453125 535.234375 586.96875 C 535.410156 586.183594 535.496094 585.402344 535.582031 584.53125 C 535.671875 582.964844 535.496094 581.308594 535.148438 579.742188 C 546.644531 567.898438 555.523438 552.746094 562.316406 538.464844 C 573.289062 515.300781 579.734375 490.308594 580.953125 464.703125 C 582.171875 439.277344 577.90625 413.324219 567.804688 389.988281 C 556.046875 363.167969 535.757812 345.226562 509.285156 334.082031 Z M 454.507812 737.011719 C 454.683594 737.011719 454.945312 736.925781 455.117188 736.925781 C 455.378906 737.359375 455.726562 737.710938 456.078125 738.058594 C 455.726562 737.796875 455.292969 737.621094 454.945312 737.359375 C 454.945312 737.359375 454.769531 737.1875 454.507812 737.011719 Z M 495.785156 732.222656 C 495.699219 732.222656 495.699219 732.222656 495.785156 732.222656 C 495.960938 731.613281 495.960938 731.613281 495.785156 732.222656 Z M 508.152344 690.511719 C 507.714844 696.082031 504.40625 701.046875 500.140625 704.445312 C 497.703125 706.359375 495.003906 707.925781 492.042969 709.320312 C 489.777344 708.796875 487.425781 709.320312 485.335938 711.234375 C 484.988281 711.585938 484.640625 711.933594 484.292969 712.367188 C 476.976562 714.804688 469.140625 716.285156 462.171875 717.765625 C 449.980469 720.292969 435.523438 722.035156 424.640625 714.632812 C 416.105469 708.796875 412.449219 698.695312 409.050781 689.117188 C 415.148438 691.382812 421.679688 692.863281 428.382812 693.644531 C 451.199219 696.257812 477.238281 692.773438 499.09375 685.71875 C 501.796875 684.851562 504.496094 683.890625 507.105469 682.761719 C 507.367188 685.371094 508.328125 687.8125 508.152344 690.511719 Z M 519.039062 645.835938 C 509.808594 668.21875 479.242188 671.960938 458.253906 674.660156 C 435.175781 677.621094 407.917969 676.925781 392.59375 656.546875 C 385.539062 647.230469 382.230469 635.648438 380.140625 624.242188 C 378.835938 617.011719 378.921875 609.085938 377.875 601.597656 C 382.492188 604.734375 387.195312 607.609375 392.070312 610.21875 C 410.621094 619.886719 430.996094 625.546875 451.898438 626.679688 C 474.449219 627.898438 497.179688 623.71875 515.292969 609.609375 C 517.644531 607.78125 520.167969 605.867188 522.695312 603.777344 C 523.566406 606.738281 524.175781 609.785156 524.347656 612.832031 C 525.046875 623.542969 523.21875 635.910156 519.039062 645.835938 Z M 463.914062 500.667969 C 462.519531 504.761719 460.34375 503.457031 459.648438 500.058594 C 459.039062 497.1875 459.386719 493.964844 459.472656 491.089844 C 459.558594 489.699219 459.558594 488.304688 459.648438 486.824219 C 462.695312 491.527344 465.21875 496.839844 463.914062 500.667969 Z M 456.773438 517.914062 C 464 520.175781 471.664062 516.34375 475.671875 510.25 C 481.679688 501.019531 478.371094 490.480469 473.667969 481.425781 C 471.140625 476.636719 468.09375 471.496094 464.4375 466.792969 C 464.609375 466.535156 464.785156 466.183594 464.960938 465.925781 C 468.53125 460.4375 475.757812 455.648438 482.375 458.609375 C 487.949219 461.132812 490.386719 468.1875 491.605469 473.675781 C 494.914062 488.042969 492.042969 504.066406 488.734375 518.171875 C 484.726562 534.894531 478.71875 551.089844 474.015625 567.636719 C 470.53125 579.828125 466.613281 593.933594 467.050781 607.171875 C 465.21875 607.347656 463.304688 607.433594 461.476562 607.519531 C 461.476562 607.433594 461.476562 607.257812 461.476562 607.171875 C 461.214844 579.566406 444.582031 555.007812 433.609375 530.625 C 427.949219 518.085938 422.984375 504.761719 422.460938 490.917969 C 422.113281 480.988281 426.121094 461.222656 440.488281 466.359375 C 443.015625 467.230469 445.367188 468.882812 447.457031 470.800781 C 443.710938 484.210938 439.53125 512.511719 456.773438 517.914062 Z M 545.945312 523.222656 C 535.582031 546.738281 518.515625 564.5 504.144531 585.3125 C 502.144531 588.1875 502.753906 591.0625 504.582031 593.066406 C 498.3125 598.027344 491.695312 601.945312 483.855469 604.210938 C 483.507812 604.296875 483.160156 604.386719 482.722656 604.472656 C 483.421875 598.375 484.03125 592.28125 485.335938 586.183594 C 487.6875 575.125 490.910156 564.238281 494.132812 553.441406 C 500.140625 533.152344 506.496094 512.511719 507.019531 491.179688 C 507.457031 474.894531 504.582031 453.121094 487.6875 445.546875 C 474.710938 439.710938 462.171875 446.242188 454.335938 456.519531 C 448.585938 452.164062 441.882812 449.464844 434.21875 449.988281 C 415.929688 451.292969 407.222656 470.105469 406.4375 486.300781 C 405.308594 507.8125 414.449219 528.710938 423.941406 547.519531 C 433.871094 567.113281 443.625 586.097656 449.71875 607.347656 C 445.105469 606.996094 440.488281 606.476562 436.046875 605.605469 C 421.941406 602.992188 408.269531 598.203125 395.640625 591.234375 C 396.25 589.84375 396.164062 588.015625 394.945312 586.96875 C 387.542969 580.613281 379.183594 575.648438 371.171875 569.988281 C 363.246094 564.328125 356.28125 557.359375 350.269531 549.871094 C 337.382812 533.761719 328.414062 514.429688 322.230469 494.835938 C 314.742188 471.148438 308.992188 444.761719 312.476562 419.855469 C 315.523438 397.914062 327.28125 378.929688 343.828125 364.472656 C 382.40625 330.859375 437.613281 331.554688 483.855469 346.535156 C 507.628906 354.195312 530.097656 365.34375 543.074219 387.636719 C 554.394531 406.96875 559.269531 430.21875 559.703125 452.425781 C 560.488281 476.636719 555.699219 501.105469 545.945312 523.222656 Z M 545.945312 523.222656 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 352.882812 428.21875 C 353.144531 424.035156 353.753906 420.03125 354.886719 415.9375 C 356.019531 411.671875 357.847656 407.664062 359.5 403.574219 C 361.070312 399.828125 362.898438 396.34375 364.902344 392.863281 C 367.253906 388.855469 368.472656 385.371094 371.867188 382.410156 C 376.570312 378.40625 368.992188 371.003906 365.164062 375.707031 C 362.113281 379.539062 358.28125 382.324219 355.410156 386.417969 C 352.535156 390.511719 350.359375 395.125 348.617188 399.828125 C 346.960938 404.269531 346.351562 409.234375 346.003906 413.933594 C 345.570312 418.636719 345.828125 423.515625 346.4375 428.21875 C 346.960938 432.222656 352.621094 432.484375 352.882812 428.21875 Z M 352.882812 428.21875 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 349.398438 458.695312 C 348.53125 455.039062 342.347656 455.734375 342.695312 459.566406 C 345.480469 490.917969 358.632812 520.003906 379.007812 543.863281 C 381.273438 546.476562 385.800781 543.078125 383.886719 540.117188 C 367.511719 515.386719 356.28125 487.519531 349.398438 458.695312 Z M 349.398438 458.695312 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 507.457031 204.851562 C 514.160156 198.492188 518.339844 188.738281 522.867188 180.816406 C 527.308594 172.976562 531.839844 165.226562 536.28125 157.300781 C 540.722656 149.464844 545.164062 141.628906 549.601562 133.789062 C 551.953125 129.609375 554.394531 125.429688 556.65625 121.25 C 559.355469 116.375 559.792969 113.585938 558.050781 108.449219 C 557.355469 106.445312 555.523438 105.3125 553.347656 105.835938 C 548.121094 106.96875 545.945312 108.710938 543.246094 113.414062 C 540.894531 117.59375 538.542969 121.773438 536.191406 125.953125 C 531.75 133.789062 527.398438 141.714844 522.957031 149.550781 C 518.515625 157.390625 514.246094 165.3125 509.894531 173.238281 C 505.453125 181.25 499.269531 189.957031 497.265625 199.015625 C 496.132812 204.761719 502.925781 209.03125 507.457031 204.851562 Z M 507.457031 204.851562 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 769.3125 227.578125 C 728.820312 238.8125 691.027344 260.84375 659.851562 288.882812 C 657.238281 291.234375 660.546875 295.328125 663.507812 293.585938 C 699.296875 273.035156 735.785156 253.617188 771.839844 233.585938 C 775.148438 231.757812 772.882812 226.535156 769.3125 227.578125 Z M 769.3125 227.578125 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 782.289062 472.195312 C 779.851562 469.667969 776.191406 469.058594 772.882812 468.273438 C 769.835938 467.578125 766.789062 466.707031 763.738281 465.921875 C 757.121094 464.269531 750.589844 462.703125 744.058594 460.785156 C 737.527344 458.871094 731.082031 456.867188 724.726562 454.515625 C 718.542969 452.164062 712.101562 448.679688 705.480469 447.984375 C 700.429688 447.460938 698.601562 454.253906 701.5625 457.390625 C 706.441406 462.527344 714.625 465.226562 720.980469 467.839844 C 727.253906 470.363281 733.695312 472.804688 740.226562 474.632812 C 746.757812 476.460938 753.464844 478.117188 760.167969 478.984375 C 763.914062 479.507812 767.570312 479.855469 771.316406 480.03125 C 774.710938 480.207031 778.542969 480.464844 781.503906 478.550781 C 783.683594 477.246094 784.203125 474.195312 782.289062 472.195312 Z M 782.289062 472.195312 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 336.425781 61.859375 C 339.386719 73.789062 341.5625 85.894531 345.046875 97.652344 C 348.617188 110.105469 353.230469 122.296875 358.542969 134.136719 C 361.15625 139.886719 363.941406 145.546875 367.078125 151.03125 C 370.039062 156.171875 373.085938 162.265625 379.445312 163.398438 C 381.707031 163.832031 383.363281 162.789062 384.234375 160.699219 C 386.496094 154.953125 383.277344 149.550781 381.011719 144.328125 C 378.222656 138.144531 375.523438 131.875 372.914062 125.605469 C 367.863281 113.152344 363.332031 100.523438 359.589844 87.636719 C 353.058594 64.90625 349.050781 42.003906 329.894531 26.332031 C 327.28125 24.152344 322.664062 26.941406 324.84375 30.25 C 331.113281 39.652344 333.726562 51.0625 336.425781 61.859375 Z M 336.425781 61.859375 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 105.21875 242.90625 C 108.617188 246.648438 111.75 250.394531 115.582031 253.789062 C 123.59375 260.929688 132.304688 267.199219 141.882812 272.164062 C 151.199219 276.953125 161.039062 280.960938 171.140625 283.921875 C 176.105469 285.402344 181.15625 286.535156 186.292969 287.230469 C 189.082031 287.578125 191.953125 288.1875 194.652344 287.664062 C 197.179688 287.144531 199.355469 286.011719 201.882812 285.574219 C 204.667969 285.140625 204.929688 280.960938 202.664062 279.742188 C 200.488281 278.523438 199.007812 276.78125 196.917969 275.472656 C 195.003906 274.253906 192.824219 273.644531 190.648438 272.863281 C 185.859375 271.207031 181.070312 269.640625 176.367188 267.984375 C 167.308594 264.761719 158.515625 260.929688 149.980469 256.578125 C 141.535156 252.222656 133.261719 247.605469 124.988281 242.816406 C 120.722656 240.378906 116.28125 237.855469 112.1875 235.15625 C 108.09375 232.367188 104.785156 228.710938 100.257812 226.445312 C 97.121094 224.878906 94.160156 228.015625 95.640625 231.0625 C 97.90625 235.765625 101.738281 239.074219 105.21875 242.90625 Z M 105.21875 242.90625 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 158.167969 528.449219 C 139.09375 535.414062 120.722656 544.558594 102.085938 552.484375 C 92.679688 556.488281 83.363281 560.496094 73.957031 564.5 C 65.335938 568.246094 54.710938 571.992188 48.09375 578.78125 C 44.609375 582.351562 47.222656 588.1875 52.101562 588.363281 C 61.679688 588.710938 71.953125 583.832031 80.664062 580.351562 C 90.15625 576.519531 99.558594 572.511719 108.878906 568.421875 C 127.425781 560.234375 146.410156 552.398438 164 542.207031 C 171.140625 538.117188 166.351562 525.402344 158.167969 528.449219 Z M 158.167969 528.449219 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 242.460938 651.148438 C 240.113281 651.933594 237.5 652.714844 235.582031 654.285156 C 233.492188 656.027344 231.664062 658.027344 229.75 659.945312 C 226.089844 663.601562 222.519531 667.257812 218.949219 671.003906 C 211.722656 678.667969 204.582031 686.417969 197.441406 694.253906 C 190.472656 701.832031 183.507812 709.40625 176.628906 717.15625 C 173.144531 720.988281 170.183594 725.429688 166.527344 729.085938 C 165.570312 730.046875 164.523438 730.742188 163.390625 731.613281 C 163.042969 731.875 162.695312 732.136719 162.433594 732.398438 C 160.429688 731.960938 158.078125 733.441406 158.167969 735.707031 C 158.253906 739.625 159.820312 742.148438 163.480469 743.804688 C 168.355469 745.980469 173.839844 743.28125 177.5 740.058594 C 186.46875 732.308594 194.132812 722.644531 202.054688 713.847656 C 210.15625 704.703125 218.339844 695.648438 226.351562 686.503906 C 230.269531 681.976562 234.101562 677.449219 237.933594 672.832031 C 240.023438 670.308594 242.203125 667.695312 244.203125 665.082031 C 246.292969 662.382812 247.164062 660.03125 247.863281 656.722656 C 248.734375 653.585938 245.945312 650.105469 242.460938 651.148438 Z M 242.460938 651.148438 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 328.328125 715.851562 C 328.585938 711.0625 321.535156 710.363281 320.140625 714.71875 C 319.53125 716.722656 318.746094 718.464844 317.875 720.292969 C 317.003906 722.207031 316.570312 724.210938 316.132812 726.300781 C 315.175781 730.132812 314.132812 733.878906 313.347656 737.710938 C 311.605469 745.546875 310.648438 753.558594 308.734375 761.308594 C 307.863281 765.054688 306.292969 768.625 308.296875 772.367188 C 310.300781 776.027344 315.351562 777.507812 318.574219 774.371094 C 319.617188 773.324219 319.878906 772.195312 320.140625 770.800781 C 320.140625 770.800781 320.140625 770.714844 320.140625 770.714844 C 320.140625 770.453125 320.226562 770.277344 320.226562 770.015625 C 320.574219 769.40625 321.097656 768.363281 321.097656 768.273438 C 322.230469 765.925781 322.578125 763.398438 323.101562 760.875 C 323.972656 755.996094 324.84375 751.03125 325.625 746.070312 C 326.410156 740.929688 327.019531 735.707031 327.628906 730.566406 C 327.890625 728.128906 328.414062 725.605469 328.5 723.167969 C 328.585938 720.726562 328.238281 718.375 328.328125 715.851562 Z M 315.613281 772.019531 C 315.523438 772.019531 315.523438 772.019531 315.613281 772.019531 C 315.699219 772.019531 315.785156 772.019531 315.960938 772.019531 C 315.785156 772.019531 315.699219 772.019531 315.613281 772.019531 Z M 315.613281 772.019531 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 320.226562 770.539062 C 320.226562 770.625 320.226562 770.714844 320.140625 770.800781 C 320.054688 771.585938 320.226562 770.453125 320.226562 770.539062 Z M 320.226562 770.539062 " fillOpacity="1" fillRule="nonzero"/><path fill="#000000" d="M 723.421875 648.972656 C 723.421875 648.972656 723.332031 648.796875 723.246094 648.625 C 723.246094 648.535156 722.8125 647.492188 722.636719 647.316406 C 722.113281 646.445312 721.332031 645.75 720.460938 645.140625 C 719.242188 644.269531 717.933594 644.445312 716.976562 645.140625 C 716.890625 645.140625 716.890625 645.054688 716.800781 645.054688 C 716.28125 644.617188 715.757812 644.183594 715.234375 643.660156 C 712.796875 641.394531 710.359375 639.132812 707.832031 636.953125 C 702.257812 632.078125 696.773438 626.851562 690.503906 622.847656 C 687.105469 620.667969 682.40625 621.890625 680.054688 624.9375 C 677.441406 628.332031 678.050781 632.425781 680.664062 635.5625 C 685.625 641.484375 691.722656 646.445312 697.46875 651.585938 C 698.863281 652.890625 700.34375 654.109375 701.824219 655.328125 C 703.480469 656.636719 705.046875 658.203125 706.960938 659.074219 C 709.921875 660.554688 712.796875 661.25 716.105469 660.640625 C 719.242188 660.03125 721.941406 657.855469 722.8125 654.804688 C 723.855469 653.066406 724.292969 651.0625 723.421875 648.972656 Z M 721.242188 647.925781 C 721.242188 647.925781 721.332031 647.925781 721.332031 648.015625 C 722.375 649.40625 722.375 649.40625 721.242188 647.925781 Z M 715.410156 647.492188 C 715.410156 647.578125 715.320312 647.664062 715.320312 647.839844 C 715.320312 647.664062 715.320312 647.578125 715.410156 647.492188 Z M 715.410156 647.492188 " fillOpacity="1" fillRule="nonzero"/></svg>
    );
};