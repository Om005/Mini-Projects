use std::fs;

struct User{
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64
}

struct Rect{
    width: u32,
    height: u32
}
impl Rect{
    fn area(&self) -> u32{
        return self.width*self.height;
    }
    fn perimeter(&self) -> u32{
        return 2*(self.width+self.height);
    }
}

enum Direction{
    North, 
    East, 
    South, 
    West,
}

enum Shape{
    Circle(f64),
    Square(f64),
    Rectangle(f64, f64),
}


fn calc_area(shape: Shape) -> f64{
    let ans = match shape{
        Shape::Circle(radius) => 3.14*radius*radius,
        Shape::Rectangle(width, hight) => width*hight,
        Shape::Square(len) => len*len,
    };
    return ans;
}

struct  Point<T>{
    x: T,
    y: T,
}

// enum Result<A, B>{
//     Ok(A),
//     Err(B),
// }

// pub enum Option<T>{
//     None, 
//     Some(T)
// }

fn main(){
    let user1 = User{
        active: true,
        username: String::from("someone"),
        email: String::from("someemail@gmail.com"),
        sign_in_count: 34
    };
    println!("{}", user1.username);

    let my_direction = Direction::North;
    let new_direction = my_direction; //--> No error, because Direction is copy


    let circle = Shape::Circle(2.2);
    let sqr = Shape::Square(3.3);


    let point = Point{x: 2, y: 5};

    let res = fs::read_to_string("example.txt");
    match res{
        Ok(content)=>{
            println!("{}", content);
        }
        Err(err)=>{
            println!("{}", err)
        }
    }

    println!("Heyyllo");


    // let res2 = read_from_file_unsafe(String::from("example.txt"));
    // println!("{}", res2);

    let ss = String::from("raman");
    let index = match first_a(ss){
        // Some(index) => println!("{}", index),
        // None => println!("{}", "No 'a' found")
        Some(index) => index,
        None => -1,
    };

    println!("{}", index)


}


fn read_from_file_unsafe(file: String) -> String{
    let res = fs::read_to_string(file);
    return res.unwrap();
}


fn first_a(s: String) -> Option<i32>{
    for (index, character) in s.chars().enumerate() {
        if (character=='a'){
            return Some(index as i32);
        }
    }
    return None;
}