const mj = require('jalali-moment');

exports.toPersianDate = (date,format="YYYY/MM/DD")=>{
    return mj(date).locale('fa').format(format);
};

exports.excerpt = (post , wordLimit = 20)=>{
    const words = post.content.split(' ');
    return words.slice(0,wordLimit-1).join(' ')+' ...';
}