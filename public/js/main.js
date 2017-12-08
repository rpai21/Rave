$(document).ready(() =>{
	

	$('#createPartyButton').click(()=>{
		let obj = {};
		obj.name = $('#form3').val();
		obj.description = $('#form8').val();
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

	$.get( "/party/getParties", function( data ) {
	  	for(let i = 0; i < data.length; i++){
	  		appendParty(data[i]);
	  	}
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
				                
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

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

			                <p><small>by <strong>${obj.owner.username}</strong></small></p>

							<p><strong>${obj.count}</strong> People Going</p>
						   ${badges}

			            	<br>
			                <a class="btn btn-success">Going</a>
			                <a class="btn btn-danger">Not Going</a>
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