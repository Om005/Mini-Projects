use std::fmt::Display;
struct User <'a> {
    name: &'a str,
}
struct User2 <'a, 'b> {
    name: &'a str,
    last_name: &'b str,
}

// pub trait Display {
//     fn display (){
//         println!("Some function");
//     }
// }

fn main(){
    
    // println!("{}", longest(a, b));
    
    let ans;
    let a = String::from("something2222222222222222");
    
    {
        let b = String::from("something121212");
        ans = longest_2(&a, &b);
    }

    // see now we are not passing ownership, now we are only borrowing
    // for the entire time a and b will own their strings
    // now if ans points to b, but when b goes out of scope string owned by b (which ans has borrowed) will be erased
    // so ans will a dangling pointer

    // println!("{}", ans);
    let user;
{

    let name_ = String::from("Heet");
    user = User {
        name: &name_,
    };
}
    // println!("{}", user.name);
    
    let user2;
    let first_name = String::from("om");
    {
        let lstname = String::from("chavda");
        user2 = User2 {
            name: &first_name,
            last_name: &lstname
        }
    }

    // println!("{}", user2.name);
    
}



fn longest(s1: String, s2: String) -> String {
    if s1.len() > s2.len() {
        return s1;
    }
    else {
        return s2;
    }
}

// relationship between lifetimes of parameters and return value, 
// The returned reference is valid as long as both parameters are valid
fn longest_2<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() {
        return s1;
    }
    else {
        return s2;
    }
}


fn lonest_with_announcement<'a, T>(str1: &'a str, str2: &'a str, ann: T) -> &'a str where T: Display{
    println!("Announcement: {}", ann);
    if(str1.len() > str2.len()) {
        return str1;
    }
    else {
        return str2;
    }
}