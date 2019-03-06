<template>
    <div class="echarts">
        <IEcharts
                :option="map"
                theme="macarons"
                @ready="onReady"
                @click="onClick"
        />
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.js'
    import World from 'echarts/map/json/world.json'
    import 'echarts/theme/macarons.js'

    IEcharts.registerMap('world', World)

    export default {
        name: 'home',
        components: {
            IEcharts
        },
        data () {
            // const that = this
            return {
                ins: null,
                map: {
                    title : {
                        text: 'XX产品销量分布',
                        subtext: '',
                        sublink : '',
                        left: 'center',
                        top: 'top'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var value = (params.value + '').split('.');
                            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                                    + '.' + value[1];
                            return params.seriesName + '<br/>' + params.name + ' : ' + value;
                        }
                    },
                    toolbox: {
                        show : true,
                        orient : 'vertical',
                        left: 'right',
                        top: 'center',
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    visualMap: {
                        type: 'continuous',
                        min: 0,
                        max: 10000,
                        text:['High','Low'],
                        realtime: false,
                        calculable : true,
                        color: ['orangered','yellow','lightskyblue']
                    },
                    series: [{
                        name: '世界地图',
                        type: 'map',
                        map: 'world',
                        roam: true,
                        // selectedMode: 'single',
                        itemStyle:{
                            // emphasis:{label:{show:true}}
                        },
                        data:[
                            {name : 'Afghanistan', value : 283},
                            {name : 'Angola', value : 195},
                            {name : 'Albania', value : 31},
                            {name : 'United Arab Emirates', value : 84},
                            {name : 'Argentina', value : 403},
                            {name : 'Armenia', value : 29},
                            {name : 'French Southern and Antarctic Lands', value : 2},
                            {name : 'Australia', value : 224},
                            {name : 'Austria', value : 84},
                            {name : 'Azerbaijan', value : 90},
                            {name : 'Burundi', value : 92},
                            {name : 'Belgium', value : 109},
                            {name : 'Benin', value : 95},
                            {name : 'Burkina Faso', value : 155},
                            {name : 'Bangladesh', value : 1511},
                            {name : 'Bulgaria', value : 73},
                            {name : 'The Bahamas', value : 664},
                            {name : 'Bosnia and Herzegovina', value : 38},
                            {name : 'Belarus', value : 94},
                            {name : 'Belize', value : 3},
                            {name : 'Bermuda', value : 1},
                            {name : 'Bolivia', value : 7},
                            {name : 'Brazil', value : 1952},
                            {name : 'Brunei', value : 1},
                            {name : 'Bhutan', value : 7},
                            {name : 'Botswana', value : 19},
                            {name : 'Central African Republic', value : 43},
                            {name : 'Canada', value : 341},
                            {name : 'Switzerland', value : 78},
                            {name : 'Chile', value : 171},
                            {name : 'China', value : 13598},
                            {name : 'Ivory Coast', value : 605},
                            {name : 'Cameroon', value : 206},
                            {name : 'Democratic Republic of the Congo', value : 621},
                            {name : 'Republic of the Congo', value : 35},
                            {name : 'Colombia', value : 464},
                            {name : 'Costa Rica', value : 46},
                            {name : 'Cuba', value : 112},
                            {name : 'Northern Cyprus', value : 1},
                            {name : 'Cyprus', value : 11},
                            {name : 'Czech Republic', value : 105},
                            {name : 'Germany', value : 830},
                            {name : 'Djibouti', value : 8},
                            {name : 'Denmark', value : 55},
                            {name : 'Dominican Republic', value : 100},
                            {name : 'Algeria', value : 370},
                            {name : 'Ecuador', value : 150},
                            {name : 'Egypt', value : 780},
                            {name : 'Eritrea', value : 57},
                            {name : 'Spain', value : 461},
                            {name : 'Estonia', value : 12},
                            {name : 'Ethiopia', value : 870},
                            {name : 'Finland', value : 53},
                            {name : 'Fiji', value : 8},
                            {name : 'Falkland Islands', value : 1},
                            {name : 'France', value : 632},
                            {name : 'Gabon', value : 15},
                            {name : 'United Kingdom', value : 620},
                            {name : 'Georgia', value : 43},
                            {name : 'Ghana', value : 242},
                            {name : 'Guinea', value : 108},
                            {name : 'Gambia', value : 16},
                            {name : 'Guinea Bissau', value : 108},
                            {name : 'Equatorial Guinea', value : 6},
                            {name : 'Greece', value : 111},
                            {name : 'Greenland', value : 1},
                            {name : 'Guatemala', value : 143},
                            {name : 'French Guiana', value : 2},
                            {name : 'Guyana', value : 7},
                            {name : 'Honduras', value : 76},
                            {name : 'Croatia', value : 43},
                            {name : 'Haiti', value : 98},
                            {name : 'Hungary', value : 100},
                            {name : 'Indonesia', value : 2406},
                            {name : 'India', value : 12056},
                            {name : 'Ireland', value : 44},
                            {name : 'Iran', value : 2406},
                            {name : 'Iraq', value : 309},
                            {name : 'Iceland', value : 3},
                            {name : 'Israel', value : 74},
                            {name : 'Italy', value : 605},
                            {name : 'Jamaica', value : 27},
                            {name : 'Jordan', value : 64},
                            {name : 'Japan', value : 1273},
                            {name : 'Kazakhstan', value : 159},
                            {name : 'Kenya', value : 409},
                            {name : 'Kyrgyzstan', value : 53},
                            {name : 'Cambodia', value : 143},
                            {name : 'South Korea', value : 514},
                            {name : 'Kosovo', value : 1},
                            {name : 'Kuwait', value : 29},
                            {name : 'Laos', value : 63},
                            {name : 'Lebanon', value : 43},
                            {name : 'Liberia', value : 39},
                            {name : 'Libya', value : 60},
                            {name : 'Sri Lanka', value : 207},
                            {name : 'Lesotho', value : 20},
                            {name : 'Lithuania', value : 30},
                            {name : 'Luxembourg', value : 5},
                            {name : 'Latvia', value : 20},
                            {name : 'Morocco', value : 316},
                            {name : 'Moldova', value : 1},
                            {name : 'Madagascar', value : 210},
                            {name : 'Mexico', value : 1178},
                            {name : 'Macedonia', value : 5},
                            {name : 'Mali', value : 139},
                            {name : 'Myanmar', value : 519},
                            {name : 'Montenegro', value : 6},
                            {name : 'Mongolia', value : 27},
                            {name : 'Mozambique', value : 239},
                            {name : 'Mauritania', value : 36},
                            {name : 'Malawi', value : 150},
                            {name : 'Malaysia', value : 282},
                            {name : 'Namibia', value : 21},
                            {name : 'New Caledonia', value : 2},
                            {name : 'Niger', value : 158},
                            {name : 'Nigeria', value : 1597},
                            {name : 'Nicaragua', value : 58},
                            {name : 'Netherlands', value : 166},
                            {name : 'Norway', value : 48},
                            {name : 'Nepal', value : 268},
                            {name : 'New Zealand', value : 43},
                            {name : 'Oman', value : 28},
                            {name : 'Pakistan', value : 1731},
                            {name : 'Panama', value : 36},
                            {name : 'Peru', value : 292},
                            {name : 'Philippines', value : 934},
                            {name : 'Papua New Guinea', value : 68},
                            {name : 'Poland', value : 381},
                            {name : 'Puerto Rico', value : 37},
                            {name : 'North Korea', value : 1},
                            {name : 'Portugal', value : 105},
                            {name : 'Paraguay', value : 64},
                            {name : 'Qatar', value : 17},
                            {name : 'Romania', value : 218},
                            {name : 'Russia', value : 218},
                            {name : 'Rwanda', value : 108},
                            {name : 'Western Sahara', value : 5},
                            {name : 'Saudi Arabia', value : 272},
                            {name : 'Sudan', value : 356},
                            {name : 'South Sudan', value : 99},
                            {name : 'Senegal', value : 129},
                            {name : 'Solomon Islands', value : 5},
                            {name : 'Sierra Leone', value : 57},
                            {name : 'El Salvador', value : 62},
                            {name : 'Somaliland', value : 96},
                            {name : 'Somalia', value : 96},
                            {name : 'Republic of Serbia', value : 35},
                            {name : 'Suriname', value : 5},
                            {name : 'Slovakia', value : 54},
                            {name : 'Slovenia', value : 20},
                            {name : 'Sweden', value : 93},
                            {name : 'Swaziland', value : 11},
                            {name : 'Syria', value : 78},
                            {name : 'Chad', value : 117},
                            {name : 'Togo', value : 63},
                            {name : 'Thailand', value : 664},
                            {name : 'Tajikistan', value : 76},
                            {name : 'Turkmenistan', value : 50},
                            {name : 'East Timor', value : 100},
                            {name : 'Trinidad and Tobago', value : 13},
                            {name : 'Tunisia', value : 106},
                            {name : 'Turkey', value : 721},
                            {name : 'United Republic of Tanzania', value : 449},
                            {name : 'Uganda', value : 339},
                            {name : 'Ukraine', value : 460},
                            {name : 'Uruguay', value : 33},
                            {name : 'United States', value : 3122},
                            {name : 'Uzbekistan', value : 277},
                            {name : 'Venezuela', value : 2},
                            {name : 'Vietnam', value : 890},
                            {name : 'Vanuatu', value : 2},
                            {name : 'West Bank', value : 1},
                            {name : 'Yemen', value : 227},
                            {name : 'South Africa', value : 514},
                            {name : 'Zambia', value : 132},
                            {name : 'Zimbabwe', value : 130}
                        ]
                    }]
                }
            }
        },
        methods: {
            onReady (instance) {
                this.ins = instance
            },
            onClick (event, instance, echarts) {
                console.log(this.ins.getDataURL())
            }
        }
        // beforeMount () {
        //   const that = this
        // },
        // mounted () {
        //   const that = this
        // },
        // beforeDestroy () {
        //   const that = this
        // }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .echarts {
        width: 800px;
        height: 800px;
        margin: 0 auto;
    }
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
