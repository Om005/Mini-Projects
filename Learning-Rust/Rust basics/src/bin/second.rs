fn main(){
    let s1 = String::from("Hello world");
    let s2 = &s1;  //--> not changed the owner, just borrowed , s2 is pointer to s1

    println!("s1: {}", s1);
    println!("s2: {}", s2);

    let s3 = String::from("some string");
    some_function(&s3); // ---> now ownership is not changed, pass by reference 

    let mut s4 = String::from("Hello ");
    update_string(&mut s4);
    // update_string(&mut s4);
    println!("{}", s4);
    
    let s5 = &mut s4;
    s5.push_str("hey"); 
    let s7 = &mut s4;
    let s6 = &s4;  

    println!("{}", s4);
    
}

fn some_function(some_string: &String){
    println!("{}", some_string)
}

fn update_string(s: &mut String){
    s.push_str("world");
}