export function lineal(x){
    return x
}
export function easeInOutBounce(x){
    return x < 0.5
      ? (1 - easeOutBounce(1 - 2 * x)) / 2
      : (1 + easeOutBounce(2 * x - 1)) / 2;
}

export function easeInOutQuart(x){
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

export function easeInBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    
    return c3 * x * x * x - c1 * x * x;
}

export function easeOutBounce(x) {

    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
    
}
    
export function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    return x === 0
        ? 0
        : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}


export function easeInBounce(x) {
    return 1 - easeOutBounce(1 - x);
}


export function easeOutSine(x){
    return Math.sin((x * Math.PI) / 2);
}


export default function interpolateWithEasing(easing){

    
    const buildInputRange = (initialValue, size) =>{

        let range = [];

        for (let index = 0; index < size+1; index++) {
            
            range.push(initialValue+index)

        }

        return range;

    }
    
    const buildOutputRange = (initialValue, finalValue, dimension) =>{

        let range = [];
        const size = Math.abs(finalValue-initialValue)


        if(initialValue<finalValue){

            for (let index = 0; index < size+(1/100000000000); index = index + (size/dimension)) {

            range.push((easing(index/size)*size)+(initialValue))

            }

        }else{

            for (let index = 0; index < size+(1/100000000000); index = index + (size/dimension)) {

            range.push((initialValue)-(easing(index/size)*size))

            }


        }

        return range;

    }

    return { buildInputRange, buildOutputRange }

}

