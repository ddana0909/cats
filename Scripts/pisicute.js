var pisica1=
    [[0,0,0,0,5,0,0,0,2,0],
     [0,0,0,0,1,1,1,1,1,0],
     [0,0,0,0,1,6,1,6,1,0],
     [0,0,0,0,1,1,1,1,1,0],
     [1,1,3,0,0,1,1,1,0,0],
     [1,0,0,0,0,0,1,0,0,0],
     [1,0,0,0,1,1,1,1,1,0],
     [1,0,0,1,1,1,1,1,1,0],
     [1,0,-1,1,1,1,1,1,1,0],
     [1,0,1,1,1,0,0,1,1,0],
     [4,1,1,1,1,1,0,1,1,1],
     [0,0,1,1,1,0,0,1,1,0]
     ];
var pisica2=
   [[0,2,0,0,0,5,0,0,0,0],
    [0,1,1,1,1,1,0,0,0,0],
    [0,1,6,1,6,1,0,0,0,0],
    [0,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,0,0,5,1,1],
    [0,0,0,1,0,0,0,0,0,1],
    [0,1,1,1,1,1,0,0,0,1],
    [0,1,1,1,1,1,1,0,0,1],
    [0,1,1,1,1,1,1,1,0,1],
    [0,1,1,0,0,1,1,1,0,1],
    [-1,-1,1,0,-1,-1,1,1,1,3],
    [0,1,1,0,0,1,1,1,0,0]
];
var canvas;
const cat1X=0;
const cat1Y=390;
const cat2X=0;
const cat2Y=30;
var dimPat=30;
window.addEventListener('load', OnLoad, false);

function square(name,i,j,color)
{   var startX,startY;
    if(name=='cat1')
        {startX=cat1X;
        startY=cat1Y;
        }
    if(name=='cat2')
        {startX=cat2X;
        startY=cat2Y;
        }
    if(color==null)
    {
        color='rgba(255,0,0,0.5)';
    }
    var rect= new fabric.Rect({
        width: 30, height: 30, left: startY+j*dimPat, top: startX+i*dimPat,
        fill: color
    });
    rect.i=i;
    rect.j=j;
    rect.cat=name;

    return rect;
}
function triangle(name,i,j,angle)
{   var startX,startY;
    if(name=='cat1')
        {startX=cat1X;
        startY=cat1Y;
        }
    if(name=='cat2')
        {startX=cat2X;
        startY=cat2Y;
        }
    var points;
    if(angle==0)
    points = [
        {x: 0, y: 0},
        {x: dimPat, y: dimPat},
        {x: 0, y: dimPat}
    ];
    if(angle==180)
        points = [
            {x: dimPat, y: dimPat},
            {x: dimPat, y: 0},
            {x: 0, y: 0}
        ];
    if(angle==90)
        points = [
            {x: 0, y: 0},
            {x: dimPat, y: 0},
            {x: 0, y: dimPat}
        ];
    if(angle==270)
        points = [
            {x: dimPat, y: 0},
            {x: dimPat, y: dimPat},
            {x: 0, y: dimPat}
        ];
    var trg= new fabric.Polygon(points, {
        left: startY+j*dimPat,
        top: startX+i*dimPat,
        fill: 'rgba(255,0,0,0.5)',
        selectable: false
    });
    trg.i=i;
    trg.j=j;
    trg.cat=name;
    return trg;
}


function OnLoad()
{
    canvas = new fabric.Canvas('can', {  hoverCursor: 'pointer', selection: false});
    canvas.setWidth(750);
    canvas.setHeight(380);
    initObjects();

    canvas.renderAll();

    canvas.on({
        'mouse:down' : Verify,
        'mouse:up' : VerifyMatrix
    });

}

function fix(obj)
{
    obj.hasControls = obj.hasBorders = false;
    obj.lockMovementX=obj.lockMovementY=true;
    obj.selectable= false;
    return obj;
}

function initCat(pisicaModel,name) {
    var cat1 = [];
    for (var i = 0; i < 12; i++)
        for (var j = 0; j < 10; j++)
            switch (pisicaModel[i][j])
            {
                case -1:
                    cat1.push(fix(square(name, i, j, 'white')));
                    break;
               case 1:
                   cat1.push(fix(square(name, i, j)));
                   break;
               case 2:
                   cat1.push(fix(triangle(name, i, j, 0)));
                   break;
               case 3:
                   cat1.push(triangle(name, i, j, 90));
                   break;
               case 4:
                   cat1.push(triangle(name, i, j, 180));
                   break;
               case 5:
                   cat1.push(triangle(name, i, j, 270));
                   break;
               case 6:
                   cat1.push(fix(square(name, i, j, 'purple')));
                   break;
            }
    return cat1;
}
function makeLine(coords) {
    return new fabric.Line(coords, {
        fill: 'grey',
        stroke: 'grey',
        strokeWidth: 1,
        selectable: false
    });
}
function initGrid(height,width)
{ var x=[];
    for(var i=0;i<=width/dimPat;i++)
        x.push(makeLine([i*dimPat-1,-height,i*dimPat,height]));
    for(var i=0;i<=height/dimPat;i++)
        x.push(makeLine([-width,i*dimPat-1,width,i*dimPat]));
    return x;
}
function initObjects()
{
    var cat1=[];
    cat1=initCat(pisica1,'cat1');
    var cat2=[];
    cat2=initCat(pisica2,'cat2');
    var lines=[];
    lines=initGrid(360,750);

   for (var i in cat1)
    {
    canvas.add(cat1[i]);
    }
    for (var i in cat2)
    {
        canvas.add(cat2[i]);
    }
    for (var i in lines)
    {
        canvas.add(lines[i]);
    }

}
function CorrectDiff(number)
{   var x;
    switch (number)
    {
        case 1: return 1;
        case -1: return 0;
        case 3: return 4;
        case 4: return 3;
        case 2: return 5;
        case 5: return 2;

    }
}
function Verify(e)
{   var ok=1;
    var obj = e.target;
    if(obj)
    {
    if(obj.cat=='cat1')

    {
        var x=9-obj.j;
        if(pisica1[obj.i][obj.j]!=pisica2[obj.i][9-obj.j])
            {ok=0;
            if(pisica1[obj.i][obj.j]==2&&pisica2[obj.i][9-obj.j]==5)
                ok=1;
            if(pisica1[obj.i][obj.j]==5&&pisica2[obj.i][9-obj.j]==2)
                ok=1;
            if(pisica1[obj.i][obj.j]==3&&pisica2[obj.i][9-obj.j]==4)
                ok=1;
            if(pisica1[obj.i][obj.j]==4&&pisica2[obj.i][9-obj.j]==3)
                ok=1;
            }
        else
            if(pisica1[obj.i][obj.j]==2||pisica1[obj.i][obj.j]==3||pisica1[obj.i][obj.j]==4||pisica1[obj.i][obj.j]==5)
                ok=0;
        if(ok==0)
           {pisica1[obj.i][obj.j]= CorrectDiff(pisica2[obj.i][9-obj.j]);

               canvas.clear();
               initObjects();
            canvas.renderAll();
           }
            //alert("i1="+obj.i+"j1="+obj.j+"kkk"+pisica1[obj.i][obj.j]+"i2="+obj.i+"j2="+x+"jj"+pisica2[obj.i][9-obj.j])
    }
    else
    if(obj.cat=='cat2')
    {
        var x=9-obj.j;
        if(pisica2[obj.i][obj.j]!=pisica1[obj.i][9-obj.j])
        {ok=0;
            if(pisica2[obj.i][obj.j]==2&&pisica1[obj.i][9-obj.j]==5)
                ok=1;
            if(pisica2[obj.i][obj.j]==5&&pisica1[obj.i][9-obj.j]==2)
                ok=1;
            if(pisica2[obj.i][obj.j]==3&&pisica1[obj.i][9-obj.j]==4)
                ok=1;
            if(pisica2[obj.i][obj.j]==4&&pisica1[obj.i][9-obj.j]==3)
                ok=1;
        }
        else
        if(pisica2[obj.i][obj.j]==2||pisica2[obj.i][obj.j]==3||pisica2[obj.i][obj.j]==4||pisica2[obj.i][obj.j]==5)
            ok=0;
        if(ok==0)
            {
             pisica2[obj.i][obj.j] = CorrectDiff(pisica1[obj.i][9-obj.j]);
                canvas.clear();
                initObjects();

             canvas.renderAll();
            }
            //alert("i1="+obj.i+"j1="+obj.j+"kkk"+pisica1[obj.i][obj.j]+"i2="+obj.i+"j2="+x+"jj"+pisica2[obj.i][9-obj.j]);
    }

    }
    return;
}
function VerifyMatrix()
{
    if(MatrixSymmetric())
    {
     canvas.on({
        'mouse:down' : null,
        'mouse:up' :null
    });
        fabric.Image.fromURL('Images/Check.png', function(img) {
            img.scaleToWidth(100);
            img.set({ left: 340, top: 20 });
            canvas.add(fix(img));})
            canvas.renderAll();
    }

}
function MatrixSymmetric()
{
for(var i=0;i<12;i++)
    for(var j=0;j<10;j++)
        {if(pisica1[i][j]==-1&&pisica2[i][9-j]!=0)
            return false;
         if(pisica1[i][j]==0&&(pisica2[i][9-j]!=0&&pisica2[i][9-j]!=-1))
            return false;
         if(pisica1[i][j]==1&&pisica2[i][9-j]!=1)
            return false;
        if(pisica1[i][j]==2&&pisica2[i][9-j]!=5)
            return false;
        if(pisica1[i][j]==3&&pisica2[i][9-j]!=4)
            return false;
        if(pisica1[i][j]==4&&pisica2[i][9-j]!=3)
            return false;
        if(pisica1[i][j]==5&&pisica2[i][9-j]!=2)
            return false;
        if(pisica1[i][j]==6&&pisica2[i][9-j]!=6)
            return false;
        }
   return true;
}



