export const useName = (name='pipo') => {
    if(name.includes(" ")){
        name = name.split(" ")
        return name[0]
    }else{
        return name
    }
}