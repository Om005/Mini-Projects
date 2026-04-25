use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(Hello)]
pub fn hello_derive(input: TokenStream) -> TokenStream {
    // Parse the input tokens into a syntax tree
    let input = parse_macro_input!(input as DeriveInput);

    // Get the struct name
    let name = input.ident;

    // Generate the impl using the struct name
    let expanded = quote! {
        impl Hello for #name {
            fn hello(&self) {
                println!("Hello, {}!", self.name);
            }
        }
    };

    // Convert into TokenStream and return
    TokenStream::from(expanded)
}
