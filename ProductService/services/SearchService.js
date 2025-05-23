import natural from 'natural';

class TFIDFSearch {
  constructor() {
    this.tfidf = new natural.TfIdf();
    this.products = [];
    this.initialized = false;
  }

  initialize(products) {
    if (this.initialized) return;

    this.products = products;
    
    try {
      // add products to tfidf
      products.forEach(product => {
        // give title more weight
        const titleText = `${product.title} ${product.title} ${product.title}`;
        const descriptionText = product.description || '';
        this.tfidf.addDocument(`${titleText} ${descriptionText}`.toLowerCase());
      });

      this.initialized = true;
      console.log('TF-IDF search initialized successfully');
    } catch (error) {
      console.error('Error initializing TF-IDF search:', error);
      throw error;
    }
  }

  search(query) {
    if (!this.initialized) {
      throw new Error('TF-IDF search not initialized');
    }

    const scores = new Array(this.products.length).fill(0);
    const terms = query.toLowerCase().split(/\s+/);

    // calculate the score of each product
    this.products.forEach((product, i) => {
      terms.forEach(term => {
        this.tfidf.tfidfs(term, i, (score) => {
          scores[i] += score;
        });
      });
    });

    // return the sorted results
    return this.products
      .map((product, i) => ({ product, score: scores[i] }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  }

  // fallback search method
  fallbackSearch(query) {
    return this.products.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }
}

export default new TFIDFSearch(); 