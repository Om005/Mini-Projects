// Traits are like abstract class

pub trait summary {
    fn summrize(&self) -> String {
        return String::from("This is a default implementation");
    }
    // fn summrize2(&self) -> String;
}

struct User {
    name: String,
    age: u32,
}
struct User2 {
    name: String,
    age: u32,
}
// implementation of trait summary for user struct 
impl summary for User {
    fn summrize(&self) -> String {
        return format!("User {} is {} years old.", self.name, self.age);
    }
}
impl summary for User2 {
    // fn summrize(&self) -> String {
    //     return format!("User {} is {} years old.", self.name, self.age);
    // }
}

// means parameter can be any struct which implements trait summary
fn function(item: &impl summary){
    println!("{}", item.summrize());
}

// means T must implement trait summary
fn function2<T: summary>(item: T){
    println!("{}", item.summrize());
}

// fn function2<T: trait1 + trait2>(item: T){   ----> for multiple traits condition
//     println!("{}", item.summrize());
// }

fn main(){

    let user = User {
        name: String::from("Om"),
        age: 19,
    };

    println!("{}", user.summrize());

    let user2 = User2 {
        name: String::from("Om"),
        age: 19,
    };

    println!("{}", user2.summrize());

    function(&user);
    function(&user2);

    

    

}

