const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const axios = require('axios')
const YOUTUBE_TOKEN = process.env.YOUTUBE_TOKEN

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
            version: '2017-09-21',
            iam_apikey: 'rSFYsDp1lEjRHw56KJqAZNDjdPenpjfEJIm3uqu4J8m9',
            url: 'https://gateway-tok.watsonplatform.net/tone-analyzer/api'
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
                    }).then(({ data }) => {
                        let collectMovie = data.results
                        let filtered = collectMovie.splice(0, 6)
                        let kumpulan = []
                        for (let i = 0; i < filtered.length; i++) {
                            let moviezzz = {}
                            moviezzz.title = filtered[i].title
                            moviezzz.vote_average = filtered[i].vote_average
                            moviezzz.overview = filtered[i].overview
                            moviezzz.image = `http://image.tmdb.org/t/p/w185${filtered[i].poster_path}`
                            kumpulan.push(moviezzz)
                        }
                        res.json({ kumpulan, mood })
                    })
                } else {
                    next({
                        httpStatus: 401,
                        message: 'We couldnt analyze your feeling :('
                    })
                }

            }).catch(next)

    }

    static getYoutube(req, res, next) {
        let { name } = req.params
        axios({
            method: 'GET',
            url: `https://www.googleapis.com/youtube/v3/search?part=id&q=trailer${name}&type=video&key=${YOUTUBE_TOKEN}&maxResults=1`
        }).then(({ data }) => {
            res.json(data.items[0].id.videoId)
        }).catch(next)

    }
}

module.exports = movieController;