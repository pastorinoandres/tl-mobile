import React  from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native'


export default Logo = ({size= 80})=>{

    return(
        <View style={{width:size, aspectRatio:1}}>
            <Svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M9.44697 27.4097C10.4247 26.3985 11.4572 25.451 12.4841 24.5013C15.1386 22.0448 17.7887 19.5816 20.469 17.1597C22.2544 15.5478 24.2511 14.2558 26.4739 13.4862C28.5322 12.7736 30.7393 12.5957 32.952 12.7546C36.2005 12.9873 39.4524 13.3419 42.7021 13.6517C44.2928 13.8027 45.8858 13.9135 47.4709 14.1562C48.2338 14.2726 49.037 14.5321 49.7238 14.9493C50.4577 15.3957 50.7519 16.2816 50.5483 17.0479C50.5192 16.3677 50.055 15.8062 49.4252 15.6295C49.2909 15.5914 49.1522 15.5646 49.0068 15.5646C48.5012 15.5646 48.0559 15.8118 47.774 16.1865C47.5794 16.4461 47.4597 16.7637 47.4597 17.1128C47.4597 17.3342 47.5078 17.5457 47.5928 17.7358C47.434 17.6497 47.2818 17.5557 47.1498 17.4327C46.3992 16.7369 45.5457 16.436 44.653 16.332C41.3608 15.9494 38.0675 15.5512 34.7765 15.2804C33.2887 15.1585 31.7975 15.2883 30.3153 15.3688C29.3589 15.4203 28.4159 15.5881 27.4672 15.7033C27.4024 15.7111 27.3308 15.7078 27.2771 15.7368C26.4593 16.1888 25.6204 16.6015 24.8362 17.1105C23.92 17.7056 23.0139 18.3321 22.1705 19.039C20.6525 20.3143 19.1736 21.6432 17.6992 22.9788C16.3692 24.1836 15.0559 25.4107 13.7594 26.6602C13.1117 27.2855 12.5915 28.0171 12.4058 29.0228C12.3342 29.4076 12.1463 29.7577 11.9785 30.1134C12.0131 29.9848 12.0378 29.8517 12.0378 29.713C12.0378 28.8583 11.3442 28.1648 10.4895 28.1648C9.6349 28.1648 8.94246 28.8583 8.94246 29.713C8.94246 30.2466 9.21317 30.7175 9.62372 30.9949C9.11249 30.7555 8.91897 30.2656 8.80039 29.7476C8.58449 28.8024 8.87534 28.0004 9.44697 27.4097ZM13.0568 48.7531L12.7906 48.8616C10.871 49.6458 8.69188 48.7307 7.90659 46.8101C7.12466 44.8905 7.90883 42.396 9.83067 41.6129L10.0969 41.5022L8.76571 38.2447C7.96364 36.2793 8.69076 34.0745 10.3922 32.9447C10.3933 32.2813 10.4056 31.8082 10.3956 31.3059C10.6551 31.3495 10.9997 31.2198 11.2144 31.0587C11.4359 31.4021 11.6194 31.7835 11.8968 32.2646C14.0368 31.6146 16.0112 32.8205 16.8748 34.9325L18.206 38.1922L34.6959 31.4569C34.7105 31.4502 34.7239 31.439 34.7396 31.4334C34.7552 31.4267 34.772 31.4245 34.7865 31.42L35.2967 31.2108C37.2196 30.4267 39.3976 31.3417 40.1807 33.2624C40.2019 33.3105 40.2075 33.3586 40.2254 33.4078C40.3015 33.5487 40.3887 33.6796 40.4503 33.8318L45.4383 46.0483C47.0089 49.8874 49.6265 51.1213 52.7218 49.8572C55.8149 48.5943 56.9827 45.8145 55.4144 41.9742L50.4252 29.7577C49.6377 27.8292 50.3257 25.6714 51.96 24.5237C51.0282 22.6488 49.5158 19.6912 49.1086 18.6777C49.1802 18.6218 49.8536 18.4976 50.112 18.0848C50.8604 19.124 53.1749 22.0224 54.562 23.7227C56.2579 23.7552 57.8519 24.7753 58.5332 26.4466L64 39.8298V4.29553C64 1.92404 62.077 0 59.7044 0H4.2956C1.92295 0 0 1.92404 0 4.29553V59.7045C0 62.0771 1.92295 64 4.2956 64H19.3861C19.1087 63.4843 18.8436 62.9194 18.5908 62.3019L13.0568 48.7531Z" fill="white"/>
                <Path d="M59.0522 50.883L58.9225 50.5619C58.0354 53.7254 56.5286 56.8911 52.4209 58.569C46.2863 61.0748 41.0555 58.4784 38.3763 51.9188L33.6478 40.3433L21.1659 45.4397L26.1562 57.6585C26.9169 59.5244 28.0892 60.1049 29.9014 59.3644C30.1699 59.2548 30.6811 58.9841 30.84 58.9192C32.6555 58.1786 34.8112 59.04 35.573 60.9059C36.0115 61.9809 35.856 63.1219 35.3571 64H59.7044C62.0771 64 64 62.0771 64 59.7045V53.5095C61.9708 53.9368 59.8655 52.8708 59.0522 50.883Z" fill="white"/>
            </Svg>
        </View>
    )

}