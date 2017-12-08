let uid;
$(document).ready(() =>{
	

	$('#createPartyButton').click(()=>{
		let obj = {};
		obj.name = $('#form3').val();
		obj.description = $('#form8').val();
		obj.address = $('#form215').val();
		obj.startDate = new Date($('#date1').val());
		obj.startTime = $('#time1').val();
		obj.endDate = new Date($('#date2').val());
		obj.endTime = $('#time2').val();
		obj.pay = $('#checkbox1')[0].checked;
		obj.alc = $('#checkbox2')[0].checked;
		obj.age = $('#checkbox3')[0].checked;
		$.ajax({
			type: "POST",
			url: "/party/createParty",
			data: JSON.stringify(obj),
			contentType: "application/json",
			success: function(){
				toastr.success('Your party has been made.');
			    window.location.href = "/";
			},
			error: function(){
				toastr.error('Cannot create party right now.');
			}
		});
	});
	$.get("/myId", (data)=>{
		uid = data;
		console.log(uid);
		$.get( "/party/getParties", function( data ) {
		  	for(let i = 0; i < data.length; i++){
		  		appendParty(data[i]);
		  	}
		});
	});
	
	
});

function appendParty(obj){
	console.log(obj);
	let badges = `<div class="row">`;
	if(obj.pay){
		badges+= `&nbsp;
                &nbsp;
                &nbsp;
                <a href="" class="green-text">
                    <h6 class="font-bold pb-1"><i class="fa fa-money"></i> Cost</h6>
                </a>`;
	}
	if(obj.alc){
		badges+= `&nbsp;
                &nbsp;
                &nbsp;
                <a href="" class="green-text">
                    <h6 class="font-bold pb-1"><i class="fa fa-glass"></i> Drinks</h6>
                </a>`;
	}
	if(obj.age){
		badges+= `&nbsp;
                &nbsp;
                &nbsp;
                <a href="" class="green-text">
                    <h6 class="font-bold pb-1"><i class="fa fa-users"></i> 21+</h6>
                </a>`;
	}
	badges += `</div>`;
	let going = false;
	for(let j = 0; j < obj.going.length; j++){
		if(uid === obj.going[j]._id){
			going = true;
		}
	}
	let button;
	if(going){
		button = `<a class="btn btn-success" href="/party/${obj._id}/going">Going</a>`;
	}else{
		button = `<a class="btn btn-primary" href="/party/${obj._id}/going">RSVP</a>`;
	}

	let liked = false;
	for(let j = 0; j < obj.up.length; j++){
		if(uid === obj.up[j]._id){
			liked = true;
		}
	}
	let likebutton;
	if(liked){
		likebutton = `<a class="btn btn-yellow" href="/party/${obj._id}/up">Like</a>`;
	}else{
		likebutton = `<a class="btn btn-blue-grey" href="/party/${obj._id}/up">Like</a>`;
	}

	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	let temp = `
	<!--News card-->
			<div class="card border-primary mb-3 text-center hoverable">
			    <div class="card-body">
			        <!--Grid row-->
			        <div class="row">

			            <!--Grid column-->
			            <div class="col-md-4 offset-md-1 mx-3 my-3">
			                <!--Featured image-->
			                <div class="view overlay hm-white-slight">
			                    <img src="/static/img/party.jpg" class="img-fluid">
			                    <a>
			                        <div class="mask"></div>
			                    </a>
			                </div>
			            </div>
			            <!--Grid column-->

			            <!--Grid column-->
			            <div class="col-md-7 text-left ml-3 mt-3">


			                <!--Excerpt-->


			                <h4 class="mb-4"><strong>${obj.name}</strong></h4>
			                <p><small><strong>Starts:</strong> ${new Date(obj.startDate).toLocaleString('en-US', options)} ${obj.startTime}</small><br>
			                <small><strong>Ends:</strong> ${new Date(obj.endDate).toLocaleString('en-US', options)} ${obj.endTime}</small></p>

			                <p>${obj.description}</p>

			                 <small><strong>Address:</strong> ${obj.address}</small>

			                <p><small>by <strong>${obj.owner.username}</strong></small></p>

							<p><strong>${obj.count}</strong> People Going</p>
							<p><strong>${obj.upCount}</strong> Likes</p>
						   ${badges}

			            	<br>
			                ${button}
			                ${likebutton}
			                
			            </div>
			            <!--Grid column-->
			        </div>
			        <!--Grid row-->
			    </div>
			</div>
			</div>
			<!--News card-->`;
		$('#parties').append(temp);
}