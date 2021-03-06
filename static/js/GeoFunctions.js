function AnglesDelta(a1,a2)
{
    if (a1>a2){return (Math.PI*2)-a1+a2}
    else{return a2-a1}
}


function PointsDistance(p1,p2)
{
    return Math.sqrt(Math.pow(p2.X-p1.X,2)+Math.pow(p2.Y-p1.Y,2))
}

function PointsVector(p1,p2)
{
    var m=[0,0];
    m[0]=PointsDistance(p1,p2)

    var deltaX=p2.X-p1.X;
    var deltaY=p2.Y-p1.Y;

    m[1]=Math.atan2(deltaY,deltaX)

    if (m[1]<0){m[1]=(Math.PI*2)+m[1]}
    return m
}


function DetMatrix3x3(A,B,C)
    {
        return A[0]*(B[1]*C[2]-B[2]*C[1])+A[1]*(B[2]*C[0]-B[0]*C[2])+A[2]*(B[0]*C[1]-B[1]*C[0])
    }

function VertexAngle(a1,a2)
    {
        if (a1>a2)return a1-a2-(Math.PI/2)
        else return a1-a2+(Math.PI/2)
    }

function TwoPointsToVector(p1,p2) 
    {
        var vect={};
        vect['Module']=Math.sqrt(Math.pow(p2.X-p1.X,2)+Math.pow(p2.Y-p1.Y,2));

        var deltaX=p2.X-p1.X;
        var deltaY=p2.Y-p1.Y;

        var degree=Math.atan2(deltaY,deltaX);

        if (degree<0){degree=(Math.PI*2)+degree}

        vect['Degree']=degree
        return vect
    }

function CircleFrom3Points(p1,p2,p3)
    {

    var a=[0,0,0];
    var b=[0,0,0];
    var c=[0,0,0];
    var d=[0,0,0];

    a[0]=p1.X;
    b[0]=p1.Y;
    c[0]=1;
    d[0]=Math.pow(p1.X,2)+Math.pow(p1.Y,2);


    a[1]=p2.X;
    b[1]=p2.Y;
    c[1]=1;
    d[1]=Math.pow(p2.X,2)+Math.pow(p2.Y,2);

    a[2]=p3.X;
    b[2]=p3.Y;
    c[2]=1;
    d[2]=Math.pow(p3.X,2)+Math.pow(p3.Y,2);


    var DetM=DetMatrix3x3(a,b,c);
    var DetA=DetMatrix3x3(d,b,c);
    var DetB=DetMatrix3x3(a,d,c);
    var DetC=DetMatrix3x3(a,b,d);

    var Primo=DetA/DetM/2;
    var Secondo=DetB/DetM/2;
    var Terzo=DetC/DetM;


    var circle={};
    circle['Center']={X:Primo,Y:Secondo};
    var vectp1=TwoPointsToVector(circle.Center,p1);
    circle['Radius']=vectp1.Module;
    circle['P1Degree']=vectp1['Degree'];
    circle['P2Degree']=TwoPointsToVector(circle['Center'],p2)['Degree'];
    circle['P3Degree']=TwoPointsToVector(circle['Center'],p3)['Degree'];
    circle['Direction']=TriangleDirection(p1,p2,p3);

    return circle
    }



function TriangleDirection(p1,p2,p3)
    {

    var v1=TwoPointsToVector(p1,p2);
    var v2=TwoPointsToVector(p2,p3);
    var v3=TwoPointsToVector(p3,p1);
    var delta_angle=[];

    delta_angle.push(VertexAngle(v1['Degree'],v2['Degree']));
    delta_angle.push(VertexAngle(v2['Degree'],v3['Degree']));
    delta_angle.push(VertexAngle(v3['Degree'],v1['Degree']));

    //print 'vertexAngles:',delta_angle[0],'<>',delta_angle[1],'<>',delta_angle[2]

    return (delta_angle[0]+delta_angle[1]+delta_angle[2])/(-Math.PI/2)
    }


function RadialInterpolation (center,radius,ang_start,ang_end,CW)
    {

        if (CW>0)
        {
         var delta=AnglesDelta(ang_end,ang_start)
        }
        else
        {var delta=AnglesDelta(ang_start,ang_end)}


        var steps=parseInt((10+radius/5)*(delta/Math.PI))
        //var steps=Math.abs(parseInt(delta/(Math.PI/nums)))
        //var steps=5
        var ang_unit=-delta/steps*CW
        console.log('CW:'+CW);
        console.log('ang_unit:'+(ang_unit*(180 / Math.PI)));
        console.log('delta:'+(delta*(180 / Math.PI)));
        console.log('ang_start:'+(ang_start*(180 / Math.PI)));
        path=[]
        for (i = 0; i <= steps; i++)
            {
               path.push([center.X+radius*Math.cos(ang_start+ang_unit*i),
                          center.Y+radius*Math.sin(ang_start+ang_unit*i)]);
               //alert(path);
            }
        return path
    }
