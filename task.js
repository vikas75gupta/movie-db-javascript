$(document).ready(function() {

    $('.single_movies').hide();

    const API = 'f6866ecb64af726c47ad422d7b08e283';
    const IMAGEPATH = 'https://image.tmdb.org/t/p/w500';

    // console.log('Loading');
    $('.list-movies').on('click', function(ev){
        $('.single_movies').hide();
        // console.log('testing');
        // console.log(ev);
        ev.preventDefault();// prevent the default behavior of an anchor tag
        // console.log($(this));
        // console.log($(this).text());
        var record = $(this).text();
        if(record =='Popular'){
            var apiPath = `https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=en-US&page=1`;
        }
        else if(record == 'Top Rated'){
            var apiPath = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API}&language=en-US&page=1`
        }
        else if(record == 'Upcoming'){
            var apiPath = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API}&language=en-US&page=1`
        }
        // console.log(apiPath);


        $.ajax({
            type:"GET",
            url:apiPath,
            success:function(responseApi){
                // console.log(responseApi);
                console.log(responseApi.results);
                var resultsOfApi = responseApi.results;
                // $.each([10,20,30] , function(i,value){
                //     console.log(i,value);
                // })

                // $.each(resultsOfApi , function(i,value){
                //     console.log(value);
                // })

                $('.heading').text(record + ' Movies');
                $('.list_movies').empty();

                $.each(resultsOfApi , function(i,{id,original_title,poster_path}){
                    // console.log(id , original_title,poster_path);
                    var finalPath = IMAGEPATH+poster_path;

                    $('.list_movies').append(`
                        <div class='col-xl-3 col-6 text-center'>
                            <img src='${finalPath}' class='img-fluid' />
                            <h4>
                                <a for='${id}' href='#' class='single-movie'>${original_title}</a>
                            </h4>
                        </div>
                    `);
                })
                $('.single-movie').on('click',fetchSingleMovie);

            },
            error:function(errMsg){
                console.log(errMsg);
                $('.list_movies').text('Error in Loaiding')
            }
        });
    });

    $('#search-form').submit(function(ev){
        $('.single_movies').hide();
        ev.preventDefault();
        // console.log('TEST');
        var moviename = $('#moviename').val();
        // console.log(moviename);
        var apiPath = `https://api.themoviedb.org/3/search/movie?api_key=${API}&language=en-US&query=${moviename}&page=1`;
        // console.log(apiPath);

        $.ajax({
            type:"get",
            url:apiPath,
            success:function(res){
                // console.log(res);
                $('.heading').text('Movie Name : ' + moviename);
                $('.list_movies').empty();

                $.each(res.results , function(i,{id,original_title,poster_path}){
                    console.log(id , original_title,poster_path);
                    var finalPath = IMAGEPATH+poster_path;

                    $('.list_movies').append(`
                        <div class='col-xl-3 col-6 text-center'>
                            <img src='${finalPath}' class='img-fluid' />
                            <h4>
                                <a for='${id}' href='#' class='single-movie'>${original_title}</a>
                            </h4>
                        </div>
                    `);
                });
                $('.single-movie').on('click',fetchSingleMovie);

            },
            error:function(err){}
        })
    })

    
    function fetchSingleMovie(ev){
        ev.preventDefault();
        console.log('test');
        var result = $(this).attr('for');
        console.log(result);

        var api1 = `https://api.themoviedb.org/3/movie/${result}?api_key=${API}&language=en-US`;
        var api2 = `https://api.themoviedb.org/3/movie/${result}/credits?api_key=${API}&language=en-US`;

        console.log(api1);
        console.log(api2);

        $.when($.ajax( api1 ), $.ajax( api2 ) ).done(function( result1, result2 ) {
            console.log(result1[0]);
            console.log(result2[0]);

            $('.single_movies').show();
            $('.list_movies').empty();

            $.each(result2[0].cast, function(i , {name,profile_path}){
                console.log(name,profile_path);  
                $('.movie_cast_record').append(`
                    <div class='col-xl-1 col-3 text-center'>
                        <img src='${IMAGEPATH+profile_path}' class='img-fluid' />
                        <h4>
                            ${name}
                        </h4>
                    </div>
                `)                           
            });
        });
    }

});