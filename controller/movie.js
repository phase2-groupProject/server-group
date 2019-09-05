const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const axios = require('axios')
const YOUTUBE_TOKEN = 'AIzaSyDOKhbeuCCEd7lo6BJpeiZ3vKJ0jOHLiwY'

class movieController {
    static getMovie(req, res, next) {
        let text1 = req.body.text
        let input = {
            "text": text1
        }

        let params = {
            'tone_input': input,
            'content_type': 'application/json'
        }

        const toneAnalyzer = new ToneAnalyzerV3({
            version: process.env.VERSION,
            iam_apikey: process.env.APIKEY,
            url: process.env.URL
        });

        toneAnalyzer.tone(params)
            .then(({
                document_tone
            }) => {
                let mood = document_tone.tones[0].tone_name
                let category;
                if (mood) {
                    if (mood == 'Anger') {
                        category = '28'
                    } else if (mood == 'Fear') {
                        category = '27'
                    } else if (mood == 'Joy') {
                        category = '35'
                    } else if (mood == 'Sadness') {
                        category = '18'
                    } else if (mood == 'Analytical') {
                        category = '9648'
                    } else if (mood == 'Confident') {
                        category = '99'
                    } else if (mood == 'Tentative') {
                        category = '14'
                    }

                     return axios({
                        method: 'POST',
                        url: `https://api.themoviedb.org/3/discover/movie?api_key=1203e4690e554bd5ade6ef0412e8690f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${category}`,
                    }).then(({data}) => {
                       let collectMovie = data.results
                       let filtered = collectMovie.splice(0,6)
                       let kumpulan = []
                       for(let i = 0; i < filtered.length; i++){
                           let moviezzz = {}
                           moviezzz.title = filtered[i].title
                           moviezzz.vote_average = filtered[i].vote_average
                           moviezzz.overview = filtered[i].overview
                           kumpulan.push(moviezzz)
                       }
                    //    let promises = []
                    //    for(let j = 0; j < kumpulan.length;j++){
                    //         let yutub = new Promise((resolve, reject) => {
                    //             axios({
                    //                 method: "GET",
                    //                 url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${kumpulan[j].title}&type=video&key=${YOUTUBE_TOKEN}`
                    //             })
                    //             .then(({ data }) => {
                    //                 resolve(data)
                    //             })
                    //             .catch(err => {
                    //                 reject(err)
                    //             })
                    //         })
                    //         promises.push(yutub)
                    //    }
                    //    console.log(promises)
                    //    return Promise.all(promises)
                    // }).then((data) => {
                    //     console.log(data[0].items.length)
                    //     for(let i = 0; i < kumpulan.length;i++){
                    //         kumpulan[i].youtube = data[i].items[0] 
                    //     }
                    //     console.log(kumpulan)
                    })
                } else {
                    next({
                        httpStatus: 401,
                        message: 'We couldnt analyze your feeling :('
                    })
                }

            }).catch(next)

    }

    static getYoutube(req,res,next){
        let {name} = req.params
        axios({
            method: 'GET',
            url:`https://www.googleapis.com/youtube/v3/search?part=id&q=trailer${name}&type=video&key=${YOUTUBE_TOKEN}&maxResults=1`
        }).then(({data}) => {
            res.json(data.items[0].id.videoId)
        }).catch(next)

    }
}

module.exports = movieController;