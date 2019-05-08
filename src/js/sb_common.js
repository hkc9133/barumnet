$(window).on("load",function(){
	var win_w = $(window).width();
	$('.responsive').slick({
	  dots: true,
	  infinite: false,
	  speed: 300,
		arrows:false,
	  slidesToShow: 6,
	  slidesToScroll: 1,
	  responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			dots: true
			
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	  ]
	});

	  $('.single-item').slick({
		arrows:false,
		autoplay: true,
		autoplaySpeed: 5000,
		dots: true,
	  });

	$("#burger-container").on('click', function(){
		$(this).toggleClass("open");
		var a = $(this).hasClass("open");
		console.log(a);
		if (a == true){
			$(".gnb").fadeIn(200);
		} else{
			$(".gnb").fadeOut(200);
		}
	});

	/* Page Scroll to id fn call */
	$(".navigation-menu a,a[href='#top'],a[rel='m_PageScroll2id']").mPageScroll2id({
		highlightSelector:"#navigation-menu a"
	});
	
	/* demo functions */
	$("a[rel='next']").click(function(e){
		e.preventDefault();
		var to=$(this).parent().parent("section").next().attr("id");
		$.mPageScroll2id("scrollTo",to);
	});

	if (win_w >= 1024){
	
	}else{
		$(".gnb>ul>li").on("click",function(){
			$(".gnb").fadeOut(200);
			$("#burger-container").removeClass("open");
		});
	}

	$(window).resize(function(){
		var win_w = $(window).width();
		if (win_w >= 1024){
			$(".gnb>ul>li").unbind("click");
			$(".gnb").css({"display":"block"});
			$("#burger-container").css({"display":"none"});
		}else{
			$(".gnb>ul>li").unbind("click");
			$(".gnb").css({"display":"none"});
			$("#burger-container").css({"display":"block"});
			$("#burger-container").removeClass("open");
			$(".gnb>ul>li").on("click",function(){
				$(".gnb").fadeOut(200);
				$("#burger-container").removeClass("open");
			});
		}
	});

});