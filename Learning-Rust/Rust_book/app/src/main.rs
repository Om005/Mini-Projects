use hello_macro::Hello; // this is the derive macro

trait Hello {
    fn hello(&self);
}

#[derive(Hello)]
struct Person {
    name: String,
}

fn main() {
    let p = Person { name: "Alice".to_string() };
    p.hello(); // Now this works because Hello trait exists
}
