export const isProd = process.env.IS_PROD;
// 当useApi值为free，使用免费体验接口，只供1024活动期间体验使用；
// 当useApi值为personal，使用自用接口，可能会产生费用。
const useApi = window.useApi = 'free';
export const apis = [
    'https://9884101dc4534bcda9958d0718d5deda.apig.cn-north-4.huaweicloudapis.com/myPoem49',
    'https://e7dc0b91f73047fda89dbc70fb27d1da.apig.cn-north-4.huaweicloudapis.com/myPoem48',
    'https://6d93ced644394d60b115549e00673cb1.apig.cn-north-4.huaweicloudapis.com/myPoem47',
    'https://206bfb683b1e41b98623dc2142ab671f.apig.cn-north-4.huaweicloudapis.com/myPoem46',
    'https://e5d5b8b6b2fd487b8879895d095e13f9.apig.cn-north-4.huaweicloudapis.com/myPoem45',
    'https://08d1bf455ea64e71bfe5fef400d0accf.apig.cn-north-4.huaweicloudapis.com/myPoem44',
    'https://17afff1f29124f66bb1e8df9ddf50ac8.apig.cn-north-4.huaweicloudapis.com/myPoem43',
    'https://6e25918458a74b99a782b1a9a83e84ed.apig.cn-north-4.huaweicloudapis.com/myPoem42',
    'https://bbdd7964f81346a4a0a1d40a46026c15.apig.cn-north-4.huaweicloudapis.com/myPoem41',
    'https://c7fa1622586e4f1e90cb5321e7e85a7e.apig.cn-north-4.huaweicloudapis.com/myPoem40',
    'https://752d9476fa084112b3328db91ad2c90a.apig.cn-north-4.huaweicloudapis.com/myPoem39',
    'https://3eb858288bd843549f7873570396992f.apig.cn-north-4.huaweicloudapis.com/myPoem38',
    'https://c00fa532a5bc43c78a409c39f3a37c98.apig.cn-north-4.huaweicloudapis.com/myPoem37',
    'https://bfcd14af79714a7ea7d2eb9b7973bd9b.apig.cn-north-4.huaweicloudapis.com/myPoem36',
    'https://90c79129008344b8968d89f39bde35e8.apig.cn-north-4.huaweicloudapis.com/myPoem35',
    'https://f030c88f028d4227aed47533ca3fc04a.apig.cn-north-4.huaweicloudapis.com/myPoem34',
    'https://1e627a197c71417391b200b432436e4f.apig.cn-north-4.huaweicloudapis.com/myPoem33',
    'https://e08fc3865d73475ebb1023c3ae986eb4.apig.cn-north-4.huaweicloudapis.com/myPoem32',
    'https://ffbb401f87564bccbcc58a2abd97549e.apig.cn-north-4.huaweicloudapis.com/myPoem31',
    'https://58d80b2d7abe4157ab34517d97e4f94c.apig.cn-north-4.huaweicloudapis.com/myPoem30',
    'https://c2f9c31cbafb41e4a6197d9d1615442b.apig.cn-north-4.huaweicloudapis.com/myPoem29',
    'https://6a245a6eaefe4da89ae1e4ab0068499e.apig.cn-north-4.huaweicloudapis.com/myPoem28',
    'https://b1ead54974db4872a6df8ad316eaf676.apig.cn-north-4.huaweicloudapis.com/myPoem27',
    'https://26f5e9899f584b438b4cd38bc3f99795.apig.cn-north-4.huaweicloudapis.com/myPoem26',
    'https://b52823779ad04d4fa40b4024788070ea.apig.cn-north-4.huaweicloudapis.com/myPoem25',
    'https://03b4d53d09e049908058a517dec29df4.apig.cn-north-4.huaweicloudapis.com/myPoem24',
    'https://56e9eef129244d6cbb1ba2663d9bb6ff.apig.cn-north-4.huaweicloudapis.com/myPoem23',
    'https://05cd0f0aea5f45a5af3a6a71d12c6880.apig.cn-north-4.huaweicloudapis.com/myPoem22',
    'https://5380e54975e248ddad4070085d0bbb92.apig.cn-north-4.huaweicloudapis.com/myPoem21',
    'https://19ee4eafed604c15a7899651b79568c4.apig.cn-north-4.huaweicloudapis.com/myPoem20',
    'https://a4d8077f364b430fa022124e61949d96.apig.cn-north-4.huaweicloudapis.com/myPoem19',
    'https://fd7e546319124872996e9f6113018682.apig.cn-north-4.huaweicloudapis.com/myPoem18',
    'https://2bcb88aeab524f14a93024095cbf2b4d.apig.cn-north-4.huaweicloudapis.com/myPoem17',
    'https://fc441acb0a6b4ebd8f45834a31f75ed0.apig.cn-north-4.huaweicloudapis.com/myPoem16',
    'https://2e077f40f1944c3c92d77c06bc67f4f7.apig.cn-north-4.huaweicloudapis.com/myPoem15',
    'https://f8f58a1517d3403d8c7e722714bf0843.apig.cn-north-4.huaweicloudapis.com/myPoem14',
    'https://3b8b7012c2dd4831acb285759bd9d037.apig.cn-north-4.huaweicloudapis.com/myPoem13',
    'https://e95d3d3c4f7144a199dd8512281ab94a.apig.cn-north-4.huaweicloudapis.com/myPoem12',
    'https://5a180411399941179f67b2b23dc4d871.apig.cn-north-4.huaweicloudapis.com/myPoem11',
    'https://ea424987140b49dcbaee0f5c8e1a7a41.apig.cn-north-4.huaweicloudapis.com/myPoem10',
    'https://f7cb4e9513a44b3fb0436f5e5090ef59.apig.cn-north-4.huaweicloudapis.com/myPoem9',
    'https://33893ab12ed4482d971415286787c85b.apig.cn-north-4.huaweicloudapis.com/myPoem8',
    'https://895b3eddf07c4b0eb539d2a679376117.apig.cn-north-4.huaweicloudapis.com/myPoem7',
    'https://1f7d6ee4c7484e369492046937807958.apig.cn-north-4.huaweicloudapis.com/myPoem6',
    'https://b3973192ba1242f088a1f7b21871e318.apig.cn-north-4.huaweicloudapis.com/myPoem5',
    'https://b2175503a68a46d786f4c9780044eada.apig.cn-north-4.huaweicloudapis.com/myPoem4',
    'https://118db5ceb2b34a679b94f75405b4120f.apig.cn-north-4.huaweicloudapis.com/myPoem3',
    'https://97adde49f8024c90aa88e3497be75a20.apig.cn-north-4.huaweicloudapis.com/myPoem2',
    'https://bb504be1d7504ae5bfe44ea11c09ba84.apig.cn-north-4.huaweicloudapis.com/myPoem'
];
export const getPoemUrl = isProd ?
    useApi === 'free' ?
        apis[Math.floor(Math.random() * apis.length)] :
        window.location.href :
    'http://localhost:8088';