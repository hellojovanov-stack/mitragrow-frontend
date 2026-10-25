import { useState } from 'react'
import './App.css'

function App() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Ayam Jaya',
      category: 'Ayam Fillet',
      price: 30000,
      distance: 4,
      deliveryFee: 10000,
    },
    {
      id: 2,
      name: 'Pangan Makmur',
      category: 'Ayam Fillet',
      price: 32000,
      distance: 2,
      deliveryFee: 5000,
    },
  ])

  const [name, setName] = useState('')
  const [category, setCategory] = useState('Ayam Fillet')
  const [price, setPrice] = useState('')
  const [distance, setDistance] = useState('')
  const [deliveryFee, setDeliveryFee] = useState('')

  function addSupplier(event) {
    event.preventDefault()

    if (!name.trim() || Number(price) <= 0 || distance === '' ||
        Number(distance) < 0 || deliveryFee === '' ||
        Number(deliveryFee) < 0) {
      alert('Lengkapi data dengan nilai yang valid.')
      return
    }

    const newSupplier = {
      id: Date.now(),
      name: name.trim(),
      category,
      price: Number(price),
      distance: Number(distance),
      deliveryFee: Number(deliveryFee),
    }

    setSuppliers((previous) => [...previous, newSupplier])

    setName('')
    setPrice('')
    setDistance('')
    setDeliveryFee('')
  }

  const totalCost = (supplier) =>
    supplier.price + supplier.deliveryFee

  const cheapestSupplier = suppliers.length
    ? suppliers.reduce((best, current) =>
        totalCost(current) < totalCost(best) ? current : best
      )
    : null

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">M</div>
          <div>
            <h2>MitraGrow</h2>
            <span>Business Partner</span>
          </div>
        </div>

        <p className="menu-label">MENU UTAMA</p>
        <nav className="navigation">
          <a className="nav-item active" href="#dashboard">
            <span>▦</span> Dashboard
          </a>
          <a className="nav-item" href="#suppliers">
            <span>♧</span> Cari Supplier
          </a>
          <a className="nav-item" href="#calculator">
            <span>↗</span> Profit Simulator
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">UM</div>
          <div>
            <strong>UMKM Owner</strong>
            <p>Business Account</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h1>Business Overview</h1>
          </div>
          <div className="status-badge">
            <span className="status-dot"></span>
            Supplier Intelligence
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">SMARTER PROCUREMENT, BETTER BUSINESS</p>
            <h2>Grow your business with smarter sourcing.</h2>
            <p>
              Temukan supplier yang tepat dan hitung peluang
              penghematan untuk bisnis Anda.
            </p>
            <a className="primary-button" href="#suppliers">
              Explore Suppliers <span>→</span>
            </a>
          </div>

          <div className="welcome-illustration">
            <div className="illustration-circle">↗</div>
            <div className="illustration-caption">
              <span>SUPPLY CHAIN</span>
              <strong>More Efficient</strong>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-top">
              <span>Total Supplier</span>
              <span className="stat-icon green">♧</span>
            </div>
            <h3>{suppliers.length}</h3>
            <p>Supplier tersedia di katalog</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Harga Terendah</span>
              <span className="stat-icon blue">↓</span>
            </div>
            <h3>
              {cheapestSupplier
                ? `Rp${totalCost(cheapestSupplier).toLocaleString('id-ID')}`
                : 'Rp0'}
            </h3>
            <p>Harga dan ongkos kirim</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Supplier Terdekat</span>
              <span className="stat-icon orange">⌖</span>
            </div>
            <h3>
              {suppliers.length
                ? `${Math.min(...suppliers.map((s) => s.distance))} km`
                : '—'}
            </h3>
            <p>Berdasarkan data jarak</p>
          </article>
        </section>

        <section className="content-grid">
          <div className="panel supplier-panel" id="suppliers">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">SUPPLIER DIRECTORY</p>
                <h2>Recommended Suppliers</h2>
                <p className="panel-description">
                  Bandingkan biaya untuk menemukan pilihan yang ekonomis.
                </p>
              </div>
              <span className="count-badge">{suppliers.length} suppliers</span>
            </div>

            {suppliers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">♧</div>
                <h3>Belum ada data supplier</h3>
                <p>Tambahkan supplier pertama melalui formulir di bawah.</p>
              </div>
            ) : (
              <div className="supplier-list">
                {suppliers.map((supplier) => (
                  <article className="supplier-card" key={supplier.id}>
                    <div className="supplier-avatar">
                      {supplier.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="supplier-details">
                      <h3>{supplier.name}</h3>
                      <p>{supplier.category}</p>
                      <span>⌖ {supplier.distance} km dari bisnis</span>
                    </div>

                    <div className="supplier-price">
                      <span>Total biaya/unit</span>
                      <strong>
                        Rp{totalCost(supplier).toLocaleString('id-ID')}
                      </strong>
                      <small>
                        Harga Rp{supplier.price.toLocaleString('id-ID')}
                        {' + pengiriman Rp'}
                        {supplier.deliveryFee.toLocaleString('id-ID')}
                      </small>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="panel form-panel">
            <p className="eyebrow">EXPAND YOUR NETWORK</p>
            <h2>Tambah Supplier</h2>
            <p className="panel-description">
              Masukkan informasi supplier untuk dibandingkan.
            </p>

            <form onSubmit={addSupplier}>
              <label>
                Nama supplier
                <input
                  type="text"
                  placeholder="Contoh: Supplier Ayam Sejahtera"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>

              <label>
                Kategori bahan
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option>Ayam Fillet</option>
                  <option>Beras</option>
                  <option>Minyak Goreng</option>
                  <option>Es Batu</option>
                  <option>Telur</option>
                  <option>Sayuran</option>
                </select>
              </label>

              <label>
                Harga barang per unit (Rp)
                <input
                  type="number"
                  min="1"
                  placeholder="30000"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Jarak (km)
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="5"
                    value={distance}
                    onChange={(event) => setDistance(event.target.value)}
                    required
                  />
                </label>

                <label>
                  Ongkir (Rp)
                  <input
                    type="number"
                    min="0"
                    placeholder="10000"
                    value={deliveryFee}
                    onChange={(event) => setDeliveryFee(event.target.value)}
                    required
                  />
                </label>
              </div>

              <button className="submit-button" type="submit">
                + Tambah Supplier
              </button>
            </form>
          </div>
        </section>

        <section className="panel calculator-panel" id="calculator">
          <div>
            <p className="eyebrow">PROFIT SIMULATOR</p>
            <h2>Hitung peluang penghematan</h2>
            <p className="panel-description">
              Pilih supplier dengan mempertimbangkan total biaya, bukan harga
              barang saja.
            </p>
          </div>

          <div className="calculator-result">
            <span>Supplier dengan total biaya terendah</span>
            <strong>{cheapestSupplier?.name || 'Belum tersedia'}</strong>
            <p>
              {cheapestSupplier
                ? `Rp${totalCost(cheapestSupplier).toLocaleString('id-ID')} per unit, termasuk ongkir`
                : 'Tambahkan supplier untuk memulai perbandingan.'}
            </p>
          </div>
        </section>

        <footer className="footer">
          <span>© 2026 MitraGrow</span>
          <span>Empowering UMKM through smarter sourcing.</span>
        </footer>
      </main>
    </div>
  )
}

export default App